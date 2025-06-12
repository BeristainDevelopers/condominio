//Components
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"

export const HomePageLayouts = ({children}) => {
    return (
        <div>
            {/* NavBar */}
            <header>
                <Navbar />
            </header>

            {/* Body */}
            <main className="bg-gray-100 min-h-[calc(100vh-132px)] p-4">
                {children}
            </main>

            {/* Footer */}
            <div>
                <Footer />
            </div>
        </div>
    )
};