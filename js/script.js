// Welcome to callback hell!
// Population: 0!

let delayMul = 1;

$(function() {
	$('.container').hide();
	$('.start-hidden').hide();
	
	$(document.body).css('background-color', 'black');

	$(document.body).delay(1000).animate({
		backgroundColor: '#282828'
	}, 1000, 'swing', showDesc);

	$('#skip-animation').click(function(e) {
		e.preventDefault();

		$('#skip-animation').fadeOut(250);

		delayMul = 0;

		return false;
	});
});

function showDesc() {
	$('.container').fadeIn(250 * delayMul, function() {
		$('#skip-animation').fadeIn(250);

		$('#whoami').typed({
			strings: ['whoami'],
			startDelay: 500 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').hide();
				$('#desc').delay(500 * delayMul).fadeIn(250 * delayMul, showLs);
			}
		});
	});
}

function showLs() {
	$('#ls-prompt').delay(500 * delayMul).fadeIn(250 * delayMul, function() {
		$('#ls-cmd').typed({
			strings: ['ls'],
			startDelay: 2000 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').delay(500 * delayMul).hide();
				$('#ls').delay(500 * delayMul).fadeIn(250 * delayMul, showProfiles);
			}
		});
	});
}

function showProfiles() {
	$('#profiles-prompt').delay(500 * delayMul).fadeIn(250 * delayMul, function() {
		$('#cat-profiles').typed({
			strings: ['cat profiles.txt'],
			startDelay: 2000 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').delay(500 * delayMul).hide();
				$('#profiles').delay(500 * delayMul).fadeIn(250 * delayMul, showProjects);
			}
		});
	});
}

function showProjects() {
	$('#projects-prompt').delay(500 * delayMul).fadeIn(250 * delayMul, function() {
		$('#cat-projects').typed({
			strings: ['cat projects.txt'],
			startDelay: 2000 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').delay(500 * delayMul).hide();
				$('#projects').delay(500 * delayMul).fadeIn(250 * delayMul, showLicense);
			}
		});
	});
}

function showLicense() {
	$('#license-prompt').delay(500 * delayMul).fadeIn(250 * delayMul, function() {
		$('#cat-license').typed({
			strings: ['cat license.txt'],
			startDelay: 2000 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').delay(500 * delayMul).hide();
				$('#license').fadeIn(250 * delayMul, showExit);
			}
		});
	});
}

function showExit() {
	$('#skip-animation').fadeOut(250);
	$('#exit-prompt').delay(500 * delayMul).fadeIn(250 * delayMul, function() {
		$('#exit-cmd').typed({
			strings: ['exit'],
			startDelay: 2000 * delayMul,
			typeSpeed: 50 * delayMul,
			cursorChar: '&#x2588;',
			callback: function() {
				$('.typed-cursor').delay(500 * delayMul).hide();
				$('#exit').fadeIn(250 * delayMul);
			}
		});
	});
}