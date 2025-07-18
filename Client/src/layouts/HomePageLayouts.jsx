//Components
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const HomePageLayouts = () => {
    return (
        <div>
            {/* NavBar */}
            <header>
                <Navbar />
            </header>

            {/* Body */}
            <main className="bg-gray-100 min-h-[calc(100vh-115px)] md:min-h-[calc(100vh-131px)] p-4">
                <Outlet />
            </main>

            {/* Footer */}
            <div>
                <Footer />
            </div>
        </div>
    )
};