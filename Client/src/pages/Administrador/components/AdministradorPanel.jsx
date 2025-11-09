import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { ResidentesPanel } from "../Panel/ResidentesPanel";

// Icons
import { MdMenu, MdClose, MdPeople, MdAttachMoney, MdSettings, MdLogout, MdAdminPanelSettings } from "react-icons/md";
import { components } from "react-select";
import { Logout } from "./Logout";

export const AdministradorPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Residentes");

    const menuItems = [
        { label: "Residentes", icon: <MdPeople />, component: <ResidentesPanel /> },
        { label: "Pagos", icon: <MdAttachMoney /> },
        { label: "Cerrar sesión", icon: <MdLogout />, component: <Logout /> },
    ];

    const currentItem = menuItems.find(item => item.label === selected);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex min-h-[calc(100vh-115px)] bg-gradient-to-br from-indigo-50 to-white relative">
            {/* Nav mobile */}
            <button 
                onClick={toggleSidebar}
                className="absolute top-0 left-0 z-20 md:hidden text-3xl"
            >
                {isOpen ? <MdClose className="text-white " /> : <MdMenu className="text-slate-600" />}
            </button>

            {/* Sidebar */}
            <AnimatePresence>
                {(isOpen || window.innerWidth >= 768) && (
                <motion.div 
                    initial={{ x: -250 }}
                    animate={{ x: 0 }}
                    exit={{ x: -250 }}
                    transition={{ duration: 0.4 }}
                    className="w-64 bg-indigo-600 text-white flex flex-col shadow-lg z-10"
                >
                    <div className="p-6 font-bold text-2xl border-b border-indigo-500">
                    <MdAdminPanelSettings className="inline-block mb-1 mr-1" />
                        Panel Admin
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button 
                        key={item.label}
                        onClick={() => {
                            setSelected(item.label);
                            if (window.innerWidth < 768) setIsOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-semibold transition-all cursor-pointer 
                            ${selected === item.label ? "bg-indigo-800" : "hover:bg-indigo-700"}`}
                        >
                        {item.icon}
                        {item.label}
                        </button>
                    ))}
                    </nav>
                </motion.div>
                )}
            </AnimatePresence>
            <div className="flex-1 p-6 md:p-10">
                <motion.h1 
                key={selected}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-gray-700 mb-6"
                >
                {selected}
                </motion.h1>

                <motion.div 
                key={selected + "-content"}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow rounded-xl p-6 text-gray-700"
                >
                {currentItem?.component ? (
                    currentItem.component
                ) : (
                    <p className="text-lg">Aquí irá el contenido de: <span className="font-bold">{selected}</span></p>
                )}
                </motion.div>
            </div>
    </div>
    );
};