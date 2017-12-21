// Welcome to callback hell!
// Population: 0!

var run = true;

var commandStrings = {
	'#whoami': '',
	'#ls-cmd': '',
	'#cat-profiles': '',
	'#cat-projects': '',
	'#cat-license': '',
	'#exit-cmd': '',
};

var defaultTypedOptions = {
	startDelay: 2000,
	typeSpeed: 50,
	cursorChar: '&#x2588;',
	preStringTyped: function() {
		if (!run) return false;
	},
};

$(function() {
	$('.container').hide();
	$('.start-hidden').hide();

	for (var id in commandStrings) {
		commandStrings[id] = $(id).html();
		$(id).html('');
	}
	
	$(document.body).css('background-color', 'black');

	$(document.body).delay(1000).animate({
		backgroundColor: '#282828'
	}, 1000, 'swing', showDesc);

	$('#skip-animation').click(function(e) {
		e.preventDefault();

		$('#skip-animation').fadeOut(250);

		for (var id in commandStrings) {
			$(id).html(commandStrings[id]);
		}

		$('.start-hidden').show();
		$('.typed-cursor').hide();

		run = false;

		return false;
	});
});

function showDesc() {
	$('.container').fadeIn(250, function() {
		$('#skip-animation').fadeIn(250);

		if (!run) return;

		$('#whoami').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#whoami']],
			startDelay: 500,
			callback: function() {
				$('.typed-cursor').hide();
				$('#desc').delay(500).fadeIn(250, showLs);
			}
		}));
	});
}

function showLs() {
	if (!run) return;

	$('#ls-prompt').delay(500).fadeIn(250, function() {
		$('#ls-cmd').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#ls-cmd']],
			callback: function() {
				$('.typed-cursor').delay(500).hide();
				$('#ls').delay(500).fadeIn(250, showProfiles);
			}
		}));
	});
}

function showProfiles() {
	if (!run) return;

	$('#profiles-prompt').delay(500).fadeIn(250, function() {
		$('#cat-profiles').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#cat-profiles']],
			callback: function() {
				$('.typed-cursor').delay(500).hide();
				$('#profiles').delay(500).fadeIn(250, showProjects);
			}
		}));
	});
}

function showProjects() {
	if (!run) return;

	$('#projects-prompt').delay(500).fadeIn(250, function() {
		$('#cat-projects').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#cat-projects']],
			callback: function() {
				$('.typed-cursor').delay(500).hide();
				$('#projects').delay(500).fadeIn(250, showLicense);
			}
		}));
	});
}

function showLicense() {
	if (!run) return;

	$('#license-prompt').delay(500).fadeIn(250, function() {
		$('#cat-license').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#cat-license']],
			callback: function() {
				$('.typed-cursor').delay(500).hide();
				$('#license').fadeIn(250, showExit);
			}
		}));
	});
}

function showExit() {
	if (!run) return;

	$('#skip-animation').fadeOut(250);
	$('#exit-prompt').delay(500).fadeIn(250, function() {
		$('#exit-cmd').typed(jQuery.extend({}, defaultTypedOptions, {
			strings: [commandStrings['#exit-cmd']],
			callback: function() {
				$('.typed-cursor').delay(500).hide();
				$('#exit').fadeIn(250);
			}
		}));
	});
}