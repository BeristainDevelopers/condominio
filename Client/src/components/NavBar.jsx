import { Link, useLocation } from "react-router-dom";

//Icons
import { FaHome } from "react-icons/fa";
import { IoDocuments } from "react-icons/io5";
import { FaRegNewspaper } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

export const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-300 p-6 shadow-md border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">
                        <h1>LOGO</h1>
                    </Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className={`text-lg transition-all duration-300 ${location.pathname === "/home" ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaHome className="inline-block mb-1 mr-1" />Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to="/gastos-comunes" className={`text-lg transition-all duration-300 ${location.pathname === "/gastos-comunes" ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <BsCashCoin className="inline-block mb-1 mr-1" />Gastos-Comunes
                        </Link>
                    </li>
                    <li>
                        <Link to="/anuncios" className={`text-lg transition-all duration-300 ${location.pathname === "/anuncios" ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaRegNewspaper className="inline-block mb-1 mr-1" />Anuncios
                        </Link>
                    </li>
                    <li>
                        <Link to="/residentes" className={`text-lg transition-all duration-300 ${location.pathname.startsWith("/residentes") ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <FaPeopleGroup className="inline-block mb-1 mr-1" />Residentes
                        </Link>
                    </li>
                    <li>
                        <Link to="/documentos" className={`text-lg transition-all duration-300 ${location.pathname === "/documentos" ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <IoDocuments className="inline-block mb-1 mr-1" />Documentos
                        </Link>
                    </li>
                    <li>
                        <Link to="/administrador" className={`text-lg transition-all duration-300 ${location.pathname === "/administrador" ? "text-indigo-700 font-bold text-xl" : "text-gray-700 font-semibold hover:text-gray-400"}`}>
                            <RiAdminFill className="inline-block mb-1 mr-1" />Administrador
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
};