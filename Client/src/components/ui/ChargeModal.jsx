import React from "react";

export const ChargeModal = ({ open, message, type = "loading", onClose }) => {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="bg-white rounded-lg shadow-lg px-8 py-8 flex flex-col items-center min-w-[300px]">
				{type === "loading" ? (
					<>
						<div className="mb-4 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent h-12 w-12"></div>
						<span className="text-lg font-semibold text-gray-700">{message || "Generando..."}</span>
					</>
				) : (
					<>
						<div className="mb-4">
							<svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<span className="text-lg font-semibold text-green-600">{message || "¡Enviado con éxito!"}</span>
						{onClose && (
							<button
								className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
								onClick={onClose}
							>
								Cerrar
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};