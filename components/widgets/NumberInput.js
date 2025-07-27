/**
 * NumberInput - A numeric input field for forms. Restricts input to numbers and can be configured for min/max values.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label for the input.
 * @param {number} [props.value] - The current value.
 * @param {function} [props.onChange] - Callback for value changes.
 * @param {number} [props.min] - Minimum allowed value.
 * @param {number} [props.max] - Maximum allowed value.
 * @param {number} [props.step] - Step increment.
 * @param {boolean} [props.disabled] - Disables the input if true.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.tooltip] - Tooltip help text.
 *
 * @example
 * <NumberInput
 *   name="age"
 *   label="Age"
 *   value={age}
 *   onChange={setAge}
 *   min={0}
 *   max={120}
 *   tooltip="Enter your age in years."
 * />
 */
"use client";

import { FaPlus, FaMinus } from "react-icons/fa";
import React from "react";

export default function NumberInput({
    name,
    label,
    value,
    onChange,
    disabled = false,
    placeholder = "",
    type = "int", // "int" or "float"
    step = 1,
    min,
    max,
}) {
    // Ensure value is a number or empty string
    const displayValue = value === null || value === undefined ? "" : value;
    const inputType = "number";
    const inputStep = type === "float" ? step : Math.max(1, Math.floor(step));

    const handleInputChange = (e) => {
        let val = e.target.value;
        if (val === "") {
            onChange("");
            return;
        }
        if (type === "float") {
            val = val.replace(/,/g, ".");
            const parsed = parseFloat(val);
            if (!isNaN(parsed)) onChange(parsed);
        } else {
            const parsed = parseInt(val, 10);
            if (!isNaN(parsed)) onChange(parsed);
        }
    };

    const handleIncrement = () => {
        let newValue = value === "" || value === null || value === undefined ? 0 : value;
        newValue = type === "float" ? parseFloat(newValue) : parseInt(newValue, 10);
        let next = newValue + inputStep;
        if (max !== undefined && next > max) next = max;
        onChange(next);
    };

    const handleDecrement = () => {
        let newValue = value === "" || value === null || value === undefined ? 0 : value;
        newValue = type === "float" ? parseFloat(newValue) : parseInt(newValue, 10);
        let next = newValue - inputStep;
        if (min !== undefined && next < min) next = min;
        onChange(next);
    };

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
                type={inputType}
                step={inputStep}
                min={min}
                max={max}
                className={`w-full max-w-md bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                value={displayValue}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder={placeholder}
            />
        </div>
    );
}
