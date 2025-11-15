// Icons
import { FaSpinner } from "react-icons/fa";

export const LoadSpinner = ({size="10px", height="h-10", color="text-blue-600"}) => {
    return (
        <div className={`flex justify-center items-center ${height}`}>
            <FaSpinner className={`text-${size} ${color} animate-spin`} />
        </div>
    );
};