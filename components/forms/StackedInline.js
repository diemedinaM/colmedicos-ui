/**
 * StackedInline - Handles array fields (add/remove multiple items) in the form.
 *
 * Supports parentDisabled prop for disabling all controls.
 *
 * Props:
 *   name: string (field name in form)
 *   min?: number (minimum items)
 *   max?: number (maximum items)
 *   widgets: Array<WidgetSchema> (widgets to render for each item)
 *   label?: string (label for each item)
 *   parentDisabled?: boolean (disable all controls)
 *
 * Usage:
 *   <StackedInline name="field" min={1} max={5} widgets={...} label="Item" parentDisabled={false} />
 */
import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import WidgetRenderer from "./WidgetRenderer";

export default function StackedInline({ name, min = 1, max = 5, widgets, label, parentDisabled }) {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const values = watch(name) || [];
    const canAdd = fields.length < max && !parentDisabled;
    const canRemove = fields.length > min && !parentDisabled;

    // Ensure at least `min` items are rendered on mount
    useEffect(() => {
        if (fields.length < min) {
            for (let i = fields.length; i < min; i++) {
                append({});
            }
        }
        // Only run on mount or when min changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min]);

    return (
        <div className="flex flex-col gap-4">
            {fields.map((field, idx) => (
                <div key={field.id} className="border border-gray-200 rounded-md p-4 relative bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">
                            {label ? `${label.charAt(0).toUpperCase() + label.slice(1)} ${idx + 1}` : `#${idx + 1}`}
                        </span>
                        <button
                            type="button"
                            onClick={() => remove(idx)}
                            disabled={!canRemove}
                            aria-label="Eliminar"
                            className="text-red-500 hover:text-red-700 text-sm font-semibold disabled:opacity-50"
                        >
                            Eliminar
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {widgets.map((widget) => (
                            <WidgetRenderer
                                key={widget.key}
                                widget={{
                                    ...widget,
                                    props: {
                                        ...((typeof widget.props === "function") ? widget.props() : widget.props),
                                        name: `${name}[${idx}].${widget.props.name}`,
                                    },
                                }}
                                parentDisabled={parentDisabled}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => append({})}
                disabled={!canAdd}
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold disabled:opacity-50 mt-2 self-end"
            >
                {`Agregar${label ? ` ${label}` : ''}`}
            </button>
        </div>
    );
} 