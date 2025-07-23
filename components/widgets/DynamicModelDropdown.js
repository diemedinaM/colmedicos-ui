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
