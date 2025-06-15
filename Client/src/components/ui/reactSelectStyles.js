export const reactSelectStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "white",
        borderColor: state.isFocused ? "#6366f1" : "#d1d5db", // indigo-500 o gray-300
        boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
        borderRadius: "0.5rem", // rounded-lg
        padding: "0.375rem 0.5rem", // p-2
        fontSize: "0.875rem", // text-sm
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? "#e0e7ff" : "white", // indigo-100
        color: "#111827", // gray-900
        padding: "0.5rem", // p-2
        fontWeight: state.isSelected ? "600" : "normal",
        cursor: "pointer",
    }),
    menu: (base) => ({
        ...base,
        zIndex: 9999,
        borderRadius: "0.5rem",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    }),
    singleValue: (base) => ({
        ...base,
        color: "#111827",
    }),
};
