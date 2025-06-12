// Icons
import { FaSpinner } from "react-icons/fa";

export const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-24">
            <FaSpinner className="text-4xl text-blue-600 animate-spin" />
        </div>
    );
};