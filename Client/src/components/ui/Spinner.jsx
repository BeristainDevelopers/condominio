// Icons
import { FaSpinner } from "react-icons/fa";

export const Spinner = ({color = "blue-600", size = "4xl"}) => {
    return (
        <div className="flex justify-center items-center h-24">
            <FaSpinner className={`text-${size} text-${color} animate-spin`} />
        </div>
    );
};