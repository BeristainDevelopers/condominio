import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthFromStorage } from "./store/authSlice";
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

// Components
import { NotFound } from "./components/NotFound";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setAuthFromStorage());
    }, []);

    return (
        <BrowserRouter>
            <ConfirmAlertProvider>
                <Routes>
                    {/* Auth Routes */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/recover-password" element={<RecoverPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />

                    {/* Home Routes */}
                    <Route path="/home" element={<HomePageLayouts> <HomePage /> </HomePageLayouts> } />
                    <Route path="/gastos-comunes" element={<HomePageLayouts> <GastosComunesPage /> </HomePageLayouts>} />
                    <Route path="/anuncios" element={<HomePageLayouts> <AnunciosPage /> </HomePageLayouts>} />
                    <Route path="/residentes" element={<HomePageLayouts> <ResidentesPage /> </HomePageLayouts>} />
                    <Route path="/documentos" element={<HomePageLayouts> <DocumentosPage /> </HomePageLayouts>} />
                    <Route path="/administrador" element={<HomePageLayouts> <AdministradorPage /> </HomePageLayouts>} />
                    <Route path="/residentes/perfil" element={<HomePageLayouts> <PerfilResidentePage /> </HomePageLayouts>} />

                    {/* Not Found */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </ConfirmAlertProvider>
        </BrowserRouter>
    );
}

export default App;
