import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Rutas Protegidas
export const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) return null;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <Outlet />;
};