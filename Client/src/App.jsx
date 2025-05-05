import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthFromStorage } from "./store/authSlice";
import { ConfirmAlertProvider } from "./context/ConfirmAlertProvider";
import { LoginPage } from "./pages/AuthPages/Login/LoginPage";
import { RecoverPasswordPage } from "./pages/AuthPages/RecoverPassword/RecoverPasswordPage";
import { UpdatePasswordPage } from "./pages/AuthPages/updatePassword/UpdatePasswordPage";

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
                </Routes>
            </ConfirmAlertProvider>
        </BrowserRouter>
    );
}

export default App;
