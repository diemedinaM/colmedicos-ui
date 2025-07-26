/**
 * WidgetRenderer - Renders an individual widget, integrating with React Hook Form if needed.
 *
 * Supports meta properties:
 *   - hideOnToggle: { field: string, value?: boolean }
 *   - disableOnToggle: { field: string, value?: boolean }
 *
 * Props:
 *   widget: {...}, parentDisabled?: boolean
 *
 * Usage:
 *   <WidgetRenderer widget={widget} parentDisabled={false} />
 */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import StackedInline from "./StackedInline";
import useMetaToggle from "./useMetaToggle";

export default function WidgetRenderer({ widget, parentDisabled }) {
    const { component: Component, props, variant, subWidgets, min, max, label } = widget;
    const methods = useFormContext();
    const [hidden, disabled] = useMetaToggle(widget);
    const effectiveDisabled = parentDisabled || disabled;
    const widgetProps = typeof props === "function"
        ? props(methods)
        : props;

    if (hidden) return null;

    // Support for stackedInline variant
    if (variant === "stackedInline") {
        return (
            <StackedInline
                name={widgetProps.name}
                min={min}
                max={max}
                widgets={subWidgets}
                label={label}
                parentDisabled={effectiveDisabled}
            />
        );
    }

    if (widgetProps.name) {
        return (
            <Controller
                name={widgetProps.name}
                control={methods.control}
                render={({ field, fieldState }) => (
                    <div>
                        <Component
                            {...widgetProps}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={effectiveDisabled || widgetProps.disabled}
                        />
                        {fieldState.error && (
                            <p className="mt-1 text-sm text-red-600">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                )}
            />
        );
    }

    return <Component {...widgetProps} disabled={effectiveDisabled || widgetProps.disabled} />;
} 