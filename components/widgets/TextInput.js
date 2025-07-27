"use client";

/**
 * TextInput - A simple, reusable text input field for forms.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label displayed above or beside the input.
 * @param {string} [props.value] - The current value of the input.
 * @param {function} [props.onChange] - Callback when the input value changes.
 * @param {boolean} [props.disabled] - Disables the input if true.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.tooltip] - Tooltip help text (when wrapped with withTooltip).
 *
 * @example
 * <TextInput
 *   name="first_name"
 *   label="First Name"
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Enter your first name"
 *   tooltip="Please enter your legal first name."
 * />
 */
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
