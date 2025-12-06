(() => {
	const form = document.getElementById('signupForm');
	const nameEl = document.getElementById('name');
	const ageEl = document.getElementById('age');
	const genderEl = document.getElementById('gender');
	const pwdEl = document.getElementById('password');
	const confirmEl = document.getElementById('confirmPassword');

	const nameError = document.getElementById('nameError');
	const ageError = document.getElementById('ageError');
	const genderError = document.getElementById('genderError');
	const pwdError = document.getElementById('passwordError');
	const confirmError = document.getElementById('confirmError');

	const pwRules = document.getElementById('pwRules').children;
	const toggle = document.getElementById('togglePwd');

	const rulesCheck = {
		len: pwd => pwd.length >= 8,
		case: pwd => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
		num: pwd => /\d/.test(pwd),
		spec: pwd => /[^A-Za-z0-9]/.test(pwd)
	};

	// sdfsdf

	function setFieldState(el, ok){
		el.classList.toggle('valid', ok);
		el.classList.toggle('invalid', !ok);
	}

	function validateName(){
		const v = nameEl.value.trim();
		const ok = v.length >= 2;
		nameError.textContent = ok ? '' : 'Please enter your name (min 2 characters).';
		setFieldState(nameEl, ok);
		return ok;
	}

	function validateAge(){
		const v = Number(ageEl.value);
		const ok = Number.isInteger(v) && v >= 13 && v <= 120;
		ageError.textContent = ok ? '' : 'Enter a valid age (13–120).';
		setFieldState(ageEl, ok);
		return ok;
	}

	function validateGender(){
		const ok = genderEl.value !== '';
		genderError.textContent = ok ? '' : 'Please select your gender.';
		setFieldState(genderEl, ok);
		return ok;
	}

	function validatePassword(){
		const v = pwdEl.value;
		const checks = [
			rulesCheck.len(v),
			rulesCheck.case(v),
			rulesCheck.num(v),
			rulesCheck.spec(v)
		];
		// update rule UI
		for (let i = 0; i < pwRules.length; i++){
			pwRules[i].setAttribute('data-valid', checks[i] ? 'true' : 'false');
		}
		const ok = checks.every(Boolean);
		pwdError.textContent = ok ? '' : 'Password does not meet all requirements.';
		setFieldState(pwdEl, ok);
		return ok;
	}

	function validateConfirm(){
		const ok = confirmEl.value === pwdEl.value && confirmEl.value.length > 0;
		confirmError.textContent = ok ? '' : 'Passwords do not match.';
		setFieldState(confirmEl, ok);
		return ok;
	}

	// live validation
	[nameEl, ageEl, genderEl, pwdEl, confirmEl].forEach(el => {
		el.addEventListener('input', () => {
			switch (el.id){
				case 'name': validateName(); break;
				case 'age': validateAge(); break;
				case 'gender': validateGender(); break;
				case 'password': validatePassword(); validateConfirm(); break;
				case 'confirmPassword': validateConfirm(); break;
			}
		});
	});

	// toggle password visibility
	toggle.addEventListener('click', () => {
		const isPwd = pwdEl.type === 'password';
		pwdEl.type = isPwd ? 'text' : 'password';
		toggle.textContent = isPwd ? 'Hide' : 'Show';
		toggle.setAttribute('aria-pressed', isPwd ? 'true' : 'false');
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const ok = validateName() & validateAge() & validateGender() & validatePassword() & validateConfirm();
		if (ok) {
			// Minimal success UX: show a brief confirmation then reset form
			alert('Signed up successfully (demo).');
			form.reset();
			// clear states
			[nameEl, ageEl, genderEl, pwdEl, confirmEl].forEach(el => {
				el.classList.remove('valid','invalid');
			});
			for (let i = 0; i < pwRules.length; i++) pwRules[i].setAttribute('data-valid','false');
		} else {
			// focus first invalid
			const firstInvalid = form.querySelector('.invalid, select.invalid, input.invalid');
			if (firstInvalid) firstInvalid.focus();
		}
	});
})();