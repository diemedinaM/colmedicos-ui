"use client";

export default function TextInput({
    name,
    label,
    value,
    onChange,
    disabled = false,
    placeholder = "",
}) {
    return (
        <div className="flex items-start gap-4 w-full">
            {label && (
                <label htmlFor={name} className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type="text"
                className={`w-full max-w-md bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );
}
