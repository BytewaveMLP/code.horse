var timings, trace, skipPrompts, showNextBlock, this$ = this;
document.querySelectorAll('.prompt,.response').forEach(function(it){
  return it.classList.add('hidden');
});
timings = {
  initialDelay: 1,
  ps1Delay: 0.2,
  ps1Show: 0.2,
  commandDelay: 0.6,
  commandShow: 0.15,
  responseDelay: 0.5,
  responseShow: 1
};
trace = function(){
  console.log.apply(console, arguments);
  return arguments[arguments.length - 1];
};
document.querySelector('#skip-button').addEventListener('click', skipPrompts = function(){
  document.querySelectorAll('.prompt,.response').forEach(function(block){
    var x$;
    x$ = block;
    x$.classList.remove('hidden');
    x$.classList.remove('cursor');
    x$.style.transition = '';
  });
  document.querySelector('#skip-button').classList.add('hidden');
});
showNextBlock = function(){
  var block, ref$, ps1, command, x$, ps1Width, charCount, commandWidth, delay, y$;
  if ((block = document.querySelector('.prompt.hidden,.response.hidden')) == null) {
    return skipPrompts();
  }
  switch (false) {
  case !block.classList.contains('prompt'):
    ref$ = [block.querySelector('.ps1'), block.querySelector('.command')], ps1 = ref$[0], command = ref$[1];
    block.classList.remove('hidden');
    x$ = ps1.style;
    x$.opacity = 0;
    x$.transition = "opacity " + timings.ps1Show + "s";
    ps1Width = ps1.offsetWidth;
    block.style.width = ps1Width + "px";
    charCount = command.textContent.length, commandWidth = command.offsetWidth;
    block.style.transition = "width " + charCount * timings.commandShow + "s steps(" + charCount + ")";
    setTimeout(function(){
      ps1.style.opacity = 1;
    }, 1000 * (delay = timings.ps1Delay));
    setTimeout(function(){
      block.classList.add('cursor');
    }, 1000 * (delay += timings.ps1Show));
    setTimeout(function(){
      block.style.width = (ps1Width + commandWidth) + "px";
    }, 1000 * (delay += timings.commandDelay));
    setTimeout(function(){
      block.classList.remove('cursor');
      block.style.width = '';
      showNextBlock();
    }, 1000 * (delay += charCount * timings.commandShow));
    break;
  case !block.classList.contains('response'):
    y$ = block;
    y$.style.opacity = 0;
    y$.classList.remove('hidden');
    y$.style.transition = "opacity " + timings.responseShow + "s";
    setTimeout(function(){
      block.style.opacity = 1;
    }, 1000 * timings.responseDelay);
    setTimeout(showNextBlock, 1000 * (timings.responseShow + timings.responseDelay));
    break;
  default:
    throw new Error('invalid command-line block');
  }
};
setTimeout(showNextBlock, 1000 * timings.initialDelay);
