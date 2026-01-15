export function formatRut(rut) {
	if (!rut) return '';

	rut = rut.replace(/\./g, '').replace(/-/g, '');

	const cuerpo = rut.slice(0, -1);
	const dv = rut.slice(-1);

	let cuerpoFormateado = '';
	for (let i = cuerpo.length; i > 0; i -= 3) {
		const start = Math.max(i - 3, 0);
		const part = cuerpo.substring(start, i);
		cuerpoFormateado = part + (cuerpoFormateado ? '.' + cuerpoFormateado : '');
	}
	return `${cuerpoFormateado}-${dv}`;
};