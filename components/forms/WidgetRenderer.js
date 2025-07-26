/**
 * WidgetRenderer - Renders an individual widget, integrating with React Hook Form if needed.
 *
 * Props:
 *   widget: {
 *     component: React.ComponentType,
 *     props: object | (methods) => object,
 *     variant?: string,
 *     subWidgets?: Array<WidgetSchema>,
 *     min?: number,
 *     max?: number,
 *     label?: string
 *   }
 *
 * Usage:
 *   <WidgetRenderer widget={widget} />
 */
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import StackedInline from "./StackedInline";

export default function WidgetRenderer({ widget }) {
    const { component: Component, props, variant, subWidgets, min, max, label } = widget;
    const methods = useFormContext();
    const widgetProps = typeof props === "function"
        ? props(methods)
        : props;

    // Support for stackedInline variant
    if (variant === "stackedInline") {
        return (
            <StackedInline
                name={widgetProps.name}
                min={min}
                max={max}
                widgets={subWidgets}
                label={label}
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

    return <Component {...widgetProps} />;
} 