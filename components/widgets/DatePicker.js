import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";

/**
 * DatePicker - A date selection input. Allows users to pick a date from a calendar UI.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label for the date picker.
 * @param {Date|string} [props.value] - The selected date.
 * @param {function} [props.onChange] - Callback for date changes.
 * @param {boolean} [props.disabled] - Disables the picker if true.
 * @param {Date|string} [props.minDate] - Minimum selectable date.
 * @param {Date|string} [props.maxDate] - Maximum selectable date.
 * @param {string} [props.tooltip] - Tooltip help text.
 *
 * @example
 * <DatePicker
 *   name="birth_date"
 *   label="Birth Date"
 *   value={birthDate}
 *   onChange={setBirthDate}
 *   tooltip="Select your date of birth."
 * />
 */
export default function CustomDatePicker({
    name,
    label,
    value,
    onChange,
    disabled = false,
}) {
    // Convert value to Date if string (for React Hook Form compatibility)
    const dateValue = value ? (value instanceof Date ? value : new Date(value)) : null;
    const datePickerRef = useRef(null);

    const handleIconClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

    return (
        <div className="flex items-start gap-4 w-full">
            {label && (
                <label className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="w-full max-w-md flex items-center">
                <DatePicker
                    ref={datePickerRef}
                    selected={dateValue}
                    onChange={(date) => onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                    name={name}
                    disabled={disabled}
                    className={`w-full max-w-md bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    calendarClassName="z-20"
                    placeholderText="DD/MM/AAAA"
                    autoComplete="off"
                    popperPlacement="bottom-end"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                />
                <button
                    type="button"
                    tabIndex={-1}
                    className="text-gray-400 ml-2 flex items-center focus:outline-none cursor-pointer"
                    onClick={handleIconClick}
                    disabled={disabled}
                    aria-label="Abrir calendario"
                >
                    <FaRegCalendarAlt />
                </button>
            </div>
        </div>
    );
}
