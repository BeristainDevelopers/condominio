
//Components
import { Navbar } from "../components/Navbar"

export const HomePageLayouts = ({children}) => {
    return (
        <div>
            {/* NavBar */}
            <header>
                <Navbar />
            </header>

            {/* Body */}
            <main className="bg-gray-100 min-h-[calc(100vh-96px)] p-4">
                {children}
            </main>
        </div>
    )
}