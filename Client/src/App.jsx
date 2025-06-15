import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsuario } from "./store/authThunks";
import { ConfirmAlertProvider } from "./context/ConfirmAlertProvider";

// Pages
import { LoginPage } from "./pages/AuthPages/Login/LoginPage";
import { RecoverPasswordPage } from "./pages/AuthPages/RecoverPassword/RecoverPasswordPage";
import { UpdatePasswordPage } from "./pages/AuthPages/updatePassword/UpdatePasswordPage";
import { GastosComunesPage } from "./pages/GastosComunes/GastosComunesPage";
import { HomePageLayouts } from "./layouts/HomePageLayouts";
import { HomePage } from "./pages/Home/HomePage";
import { AnunciosPage } from "./pages/Anuncios/AnunciosPage";
import { ResidentesPage } from "./pages/Residentes/ResidentesPage";
import { DocumentosPage } from "./pages/Documentos/DocumentosPage";
import { AdministradorPage } from "./pages/Administrador/AdministradorPage";
import { PerfilResidentePage } from "./pages/Residentes/PerfilResidente/PerfilResidentePage";
import { ProtectedRoute } from "./secure/ProtectedRoutes";

// Components
import { NotFound } from "./components/NotFound";

function App() {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsuario())
    }, [])

    return (
        <BrowserRouter>
            <ConfirmAlertProvider>
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/recover-password" element={<RecoverPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Home Routes */}
                    <Route element={<ProtectedRoute/>}>
                        <Route element={<HomePageLayouts />}>
                            <Route path="/" element={ <HomePage /> } />
                            <Route path="/gastos-comunes" element={ <GastosComunesPage /> } />
                            <Route path="/anuncios" element={ <AnunciosPage /> } />
                            <Route path="/residentes" element={ <ResidentesPage /> } />
                            <Route path="/documentos" element={ <DocumentosPage /> } />
                            <Route path="/administrador" element={ <AdministradorPage /> } />
                            <Route path="/residentes/perfil/:id" element={ <PerfilResidentePage /> } />
                        </Route>
                    </Route>

                    {/* Not Found */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </ConfirmAlertProvider>
        </BrowserRouter>
    );
}

export default App;
