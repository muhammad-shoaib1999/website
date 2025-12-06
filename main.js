(function () {
	const slides = Array.from(document.querySelectorAll('.slide'));
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	const dotsContainer = document.getElementById('dots');
	const hamburger = document.getElementById('hamburger');
	const navLinks = document.getElementById('navLinks');

	let current = 0;
	let interval = null;
	const AUTO_DELAY = 5000;

	function createDots() {
		if (!dotsContainer) return;
		dotsContainer.innerHTML = '';
		slides.forEach((_, i) => {
			const btn = document.createElement('button');
			btn.addEventListener('click', () => showSlide(i));
			if (i === 0) btn.classList.add('active');
			dotsContainer.appendChild(btn);
		});
	}

	function updateDots() {
		if (!dotsContainer) return;
		const dots = Array.from(dotsContainer.children);
		dots.forEach((d, i) => d.classList.toggle('active', i === current));
	}

	function showSlide(index) {
		if (!slides.length) return;
		if (index < 0) index = slides.length - 1;
		if (index >= slides.length) index = 0;
		slides.forEach(s => s.classList.remove('active'));
		slides[index].classList.add('active');
		current = index;
		updateDots();
		resetAuto();
	}

	function next() { showSlide(current + 1); }
	function prev() { showSlide(current - 1); }

	function startAuto() {
		clearInterval(interval);
		interval = setInterval(next, AUTO_DELAY);
	}
	function resetAuto() {
		clearInterval(interval);
		startAuto();
	}

	// Touch support
	let startX = 0;
	const hero = document.getElementById('heroSlider');
	if (hero) {
		hero.addEventListener('touchstart', e => startX = e.touches[0].clientX);
		hero.addEventListener('touchend', e => {
			const diff = e.changedTouches[0].clientX - startX;
			if (Math.abs(diff) > 40) (diff < 0) ? next() : prev();
		});
	}

	// Event listeners
	if (nextBtn) nextBtn.addEventListener('click', next);
	if (prevBtn) prevBtn.addEventListener('click', prev);

	// Mobile nav toggle
	if (hamburger && navLinks) {
		hamburger.addEventListener('click', () => {
			navLinks.classList.toggle('open');
			hamburger.classList.toggle('open');
		});
	}

	// init
	if (slides.length) {
		createDots();
		showSlide(0);
		startAuto();
	}
})();
