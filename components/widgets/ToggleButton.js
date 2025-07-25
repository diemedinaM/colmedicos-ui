/**
 * ToggleButton - A switch-style toggle button for boolean values (on/off, yes/no).
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label for the toggle.
 * @param {boolean} [props.value] - Current toggle state.
 * @param {function} [props.onChange] - Callback for toggle changes.
 * @param {boolean} [props.disabled] - Disables the toggle if true.
 * @param {string} [props.tooltip] - Tooltip help text.
 *
 * @example
 * <ToggleButton
 *   name="has_pets"
 *   label="Do you have pets?"
 *   value={hasPets}
 *   onChange={setHasPets}
 *   tooltip="Toggle if you have any pets at home."
 * />
 */
"use client";

export default function ToggleButton({
    name,
    label,
    value = false,
    onChange,
    disabled = false,
}) {
    return (
        <div className="flex items-start gap-4 w-full">
            {label && (
                <label htmlFor={name} className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <button
                id={name}
                name={name}
                type="button"
                className={`w-12 h-7 flex items-center rounded-full border border-gray-300 px-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${value ? "bg-blue-500" : "bg-gray-200"} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => !disabled && onChange(!value)}
                disabled={disabled}
                aria-pressed={value}
            >
                <span
                    className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 ${value ? "translate-x-5" : "translate-x-0"}`}
                />
            </button>
        </div>
    );
}
