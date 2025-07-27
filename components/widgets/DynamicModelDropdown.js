/**
 * DynamicModelDropdown - A dropdown/select input that fetches options from a backend model, dynamically filtered by a parent field.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label for the dropdown.
 * @param {string} props.appName - The backend app name for fetching options (required).
 * @param {string} props.modelName - The backend model name for fetching options (required).
 * @param {string} [props.displayField] - The field to display in the dropdown (default: "name").
 * @param {string} props.parentField - The name of the parent field to watch (required).
 * @param {string} props.query - The query parameter to use for filtering by parent (required).
 * @param {Array<string>} [props.clearFieldsOnChange] - List of child fields to clear when this value changes.
 * @param {Object|string} [props.value] - The selected value.
 * @param {function} [props.onChange] - Callback for selection changes.
 * @param {boolean} [props.disabled] - Disables the dropdown if true.
 * @param {string} [props.tooltip] - Tooltip help text.
 *
 * @example
 * <DynamicModelDropdown
 *   name="province"
 *   label="Province"
 *   appName="common"
 *   modelName="province"
 *   displayField="name"
 *   parentField="country"
 *   query="country"
 *   value={province}
 *   onChange={setProvince}
 *   tooltip="Select your province. Only provinces for the selected country are shown."
 * />
 */
// components/widgets/ReactiveModelDropdown.js
"use client";

import { useWatch, useFormContext } from "react-hook-form";
import SimpleModelDropdown from "./SimpleModelDropdown";

export default function DynamicModelDropdown({
    name,
    label,
    appName,
    modelName,
    displayField = "name",
    parentField,
    query,
    clearFieldsOnChange = [],
    value,
    onChange,
}) {
    const form = useFormContext();
    const parentValue = useWatch({ name: parentField });
    const parentId = parentValue?.id;
    const disabled = !parentId;

    let params = {};
    if (query && parentId) {
        params = { [query]: parentId };
    }

    return (
        <SimpleModelDropdown
            name={name}
            label={label}
            appName={appName}
            modelName={modelName}
            params={params}
            displayField={displayField}
            disabled={disabled}
            value={value}
            onChange={(val) => {
                onChange(val);
                for (const child of clearFieldsOnChange) {
                    form.setValue(child, null);
                }
            }}
        />
    );
}
