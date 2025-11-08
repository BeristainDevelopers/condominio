import { useConfirmAlert } from "../context/ConfirmAlertProvider";

export const useDeleteResidente = (onSuccess) => {
	const { confirm, alert } = useConfirmAlert();

	const handleDelete = async (id) => {
		const isConfirmed = await confirm("¿Estás seguro de que deseas eliminar este residente?", {
			title: "Eliminar residente",
			confirmText: "Eliminar",
			cancelText: "Cancelar"
		});
		if (!isConfirmed) return;
		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/v1/residentes/delete-residente/${id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (res.ok) {
				await alert("Residente eliminado con éxito", { title: "Eliminado" });
				if (onSuccess) onSuccess();
			} else {
				await alert(data.message || "Error al eliminar residente", { title: "Error" });
			}
		} catch (error) {
			await alert("Error al eliminar residente", { title: "Error" });
		}
	};

	return { handleDelete };
};