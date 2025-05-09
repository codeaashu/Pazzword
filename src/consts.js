const CHARSET_UPERRCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARSET_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const CHARSET_NUMBER = '0123456789';
const CHARSET_SPECIAL = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const INPUTS_CHARSET = {
	Uppercase: ['ABC', CHARSET_UPERRCASE],
	Lowercase: ['abc', CHARSET_LOWERCASE],
	Number: ['123', CHARSET_NUMBER],
	'Special characters': ['!@#', CHARSET_SPECIAL]
};

let password_length = 28;
let password_max_length = 40;
let password_min_length = 3;
let password_charset = [CHARSET_UPERRCASE, CHARSET_LOWERCASE, CHARSET_NUMBER, CHARSET_SPECIAL];
let password_strength_values = {
	5: { width: '20%', color: '#dc2626' },
	10: { width: '40%', color: '#dc8426' },
	15: { width: '60%', color: '#dccd26' },
	20: { width: '80%', color: '#66dc26' },
	30: { width: '100%', color: 'linear-gradient(90deg, #9333ea, #4a53eb)' }
};

export const charsetConfig = {
	CHARSET_UPERRCASE,
	CHARSET_LOWERCASE,
	CHARSET_NUMBER,
	CHARSET_SPECIAL,
	INPUTS_CHARSET
};

export const passwordConfig = {
	password_length,
	password_max_length,
	password_min_length,
	password_charset,
	password_strength_values
};


export function handleKeydown (e, createPassword, handleClipboard) {
	if (e.key === 'Enter' || e.key === 'r') {
		createPassword();
	}
	if (e.key === ' ' || e.key === 'c') {
		handleClipboard();
	}
	if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
		if (password_length < password_max_length) password_length++;
		createPassword();
	}
	if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
		if (password_length > 1) password_length--;
		createPassword();
	}

	const keys = {
		1: charsetConfig.CHARSET_UPERRCASE,
		2: charsetConfig.CHARSET_LOWERCASE,
		3: charsetConfig.CHARSET_NUMBER,
		4: charsetConfig.CHARSET_SPECIAL
	};

	if (e.key in keys) {
		document.querySelector(`.charset_checkbox[value="${keys[e.key]}"]`).click();
	}
}