export const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer 
            className="flex justify-center bg-gray-300 text-gray-700 px-4 
            shadow-inner border-b border-gray-200 text-center text-sm w-full bottom-0 z-40 py-4 md:py-6 lg:py-4">
                <div className="flex items-center">
                    <p className="font-semibold">© {currentYear}. Comunidad Habitacional Salvador #1050.</p>
                </div>
            
        </footer>
    );
};