//Components
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer"
import { Navbar } from "../components/NavBar"

export const HomePageLayouts = () => {
    return (
        <div>
            {/* NavBar */}
            <header>
                <Navbar />
            </header>

            {/* Body */}
            <main className="bg-gray-100 min-h-[calc(100vh-115px)] md:min-h-[calc(100vh-130px)]">
                <Outlet />
            </main>

            {/* Footer */}
            <div>
                <Footer />
            </div>
        </div>
    )
};