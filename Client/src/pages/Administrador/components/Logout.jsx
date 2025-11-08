import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUsuario } from "../../../store/authThunks";

export const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await dispatch(logoutUsuario());
		navigate("/login");
	};

	return (
		<div className="flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
      >
        Cerrar sesión
      </button>
    </div>
    
	);
};