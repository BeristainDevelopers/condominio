import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

//Icons
import { FaHome, FaRegNewspaper } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { MdMenu, MdClose } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    return (
        <>
        {/* NAV DESKTOP */}
        <nav className="bg-gray-300 p-6 shadow-md border-b border-gray-200 hidden md:block">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">
                        <h1>LOGO</h1>
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className={`text-lg transition-all duration-300 ${location.pathname === "/"  ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaHome className="inline-block mb-1 mr-1" />Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/gastos-comunes" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/gastos-comunes") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <BsCashCoin className="inline-block mb-1 mr-1" />Gastos-Comunes
                        </Link>
                    </li>
                    <li>
                        <Link to="/gastos-globales" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/gastos-globales") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <AiOutlineGlobal className="inline-block mb-1 mr-1" />Gastos-Comunes
                        </Link>
                    </li>
                    <li>
                        <Link to="/anuncios" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/anuncios") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaRegNewspaper className="inline-block mb-1 mr-1" />Anuncios
                        </Link>
                    </li>
                    <li>
                        <Link to="/residentes" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/residentes") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaPeopleGroup className="inline-block mb-1 mr-1" />Residentes
                        </Link>
                    </li>
                    <li>
                        <Link to="/documentos" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/documentos") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <IoDocuments className="inline-block mb-1 mr-1" />Documentos
                        </Link>
                    </li>
                    <li>
                        <Link to="/administrador" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/administrador") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <RiAdminFill className="inline-block mb-1 mr-1" />Administrador
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>

        {/* NAV MOBILE */}
        <nav className="bg-gray-300 p-4 shadow-md border-b border-gray-200 flex justify-between items-center md:hidden">
            <div className="text-lg font-bold">
                <Link to="/home">
                    <h1>LOGO</h1>
                </Link>
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl text-slate-600">
                {menuOpen ? <MdClose /> : <MdMenu />}
            </button>

            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-300 shadow-md z-50">
                    <ul className="flex flex-col text-center py-4 space-y-4">
                        <li>
                            <Link to="/home" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/home") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <FaHome className="inline-block mr-1" /> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/gastos-comunes" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/gastos-comunes") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <BsCashCoin className="inline-block mr-1" /> Gastos-Comunes
                            </Link>
                        </li>
                        <li>
                            <Link to="/anuncios" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/anuncios") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <FaRegNewspaper className="inline-block mr-1" /> Anuncios
                            </Link>
                        </li>
                        <li>
                            <Link to="/residentes" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/residentes") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <FaPeopleGroup className="inline-block mr-1" /> Residentes
                            </Link>
                        </li>
                        <li>
                            <Link to="/documentos" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/documentos") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <IoDocuments className="inline-block mr-1" /> Documentos
                            </Link>
                        </li>
                        <li>
                            <Link to="/administrador" onClick={() => setMenuOpen(false)} className={`text-lg ${location.pathname.startsWith("/administrador") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold"}`}>
                                <RiAdminFill className="inline-block mr-1" /> Administrador
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
        </>
    )
};