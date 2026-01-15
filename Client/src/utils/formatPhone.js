export function formatPhone(phone) {
	if (!phone) return '';

	let cleaned = phone.replace(/\D/g, '');

	if (cleaned.startsWith('56')) {
		cleaned = cleaned.slice(2);
	}

	if (cleaned.startsWith('9')) {
		cleaned = cleaned.slice(1);
	}

	if (cleaned.length === 8) {
		return `+56 9 ${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
	}

	return phone;
};