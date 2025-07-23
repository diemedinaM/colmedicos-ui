import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function CustomDatePicker({
    name,
    label,
    value,
    onChange,
    disabled = false,
}) {
    // Convert value to Date if string (for React Hook Form compatibility)
    const dateValue = value ? (value instanceof Date ? value : new Date(value)) : null;

    return (
        <div className="flex items-start gap-4 w-full">
            {label && (
                <label className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative w-full max-w-md">
                <DatePicker
                    selected={dateValue}
                    onChange={(date) => onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                    name={name}
                    disabled={disabled}
                    className={`w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10 ${disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    calendarClassName="z-20"
                    placeholderText="DD/MM/AAAA"
                    autoComplete="off"
                    popperPlacement="bottom-end"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                    <FaRegCalendarAlt />
                </span>
            </div>
        </div>
    );
}
