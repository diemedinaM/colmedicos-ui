"use client";

import React, { useState } from "react";
import {
    useForm,
    FormProvider,
    Controller,
    useFormContext,
    useFieldArray,
} from "react-hook-form";

// Main FormBuilder component
export default function FormBuilder({ schema }) {
    const { tabs, onSubmit, initialValues } = schema;
    const methods = useForm({ defaultValues: initialValues });
    const [activeTab, setActiveTab] = useState(0);

    const handlePrev = () => setActiveTab((prev) => Math.max(prev - 1, 0));
    const handleNext = () =>
        setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));

    const handleSave = methods.handleSubmit(onSubmit);
    const handleSaveContinue = methods.handleSubmit((data) => {
        onSubmit(data);
        if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
    });

    return (
        <FormProvider {...methods}>
            {/* <pre>{JSON.stringify(methods.watch(), null, 2)}</pre> */}
            <form className="space-y-6 bg-white p-6 rounded-md shadow-md">
                {/* Tab Headers */}
                <div className="border-b border-blue-300 shadow-[inset_0px_-2px_4px_0px_rgba(59,130,246,0.3)]">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {tabs.map((tab, idx) => {
                            const isActive = idx === activeTab;
                            const tabClasses =
                                "px-6 py-3 text-sm font-semibold border-b-2 transition-colors duration-200 cursor-pointer " +
                                (isActive
                                    ? "text-blue-700 border-blue-600"
                                    : "text-blue-400 border-transparent hover:text-blue-600 hover:border-blue-300");

                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(idx)}
                                    className={tabClasses}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Active Tab Content */}
                <div className="grid grid-cols-2 gap-6 w-full">
                    {(() => {
                        // Split groups by alignment
                        const groups = tabs[activeTab].groups;
                        const leftGroups = [];
                        const rightGroups = [];
                        const fullWidthGroups = [];
                        const autoGroups = [];
                        groups.forEach((group) => {
                            if (group.variant === "fullWidth") {
                                fullWidthGroups.push(group);
                            } else if (group.alignment === "left") {
                                leftGroups.push(group);
                            } else if (group.alignment === "right") {
                                rightGroups.push(group);
                            } else {
                                autoGroups.push(group);
                            }
                        });
                        // Distribute autoGroups alternately (left, right)
                        autoGroups.forEach((group, idx) => {
                            (idx % 2 === 0 ? leftGroups : rightGroups).push(group);
                        });
                        // Render fullWidth groups first, then columns
                        return (
                            <>
                                {/* Two columns: left and right */}
                                <div className="col-span-1 w-full h-full flex flex-col gap-6">
                                    {leftGroups.map((group) => (
                                        <fieldset key={group.key} className="border border-gray-300 rounded-md p-4 relative w-full">
                                            {group.title && (
                                                <legend className="text-sm font-medium px-2 text-gray-700 bg-white -ml-1">
                                                    {group.title}
                                                </legend>
                                            )}
                                            <GroupRenderer group={group} />
                                        </fieldset>
                                    ))}
                                </div>
                                <div className="col-span-1 w-full h-full flex flex-col gap-6">
                                    {rightGroups.map((group) => (
                                        <fieldset key={group.key} className="border border-gray-300 rounded-md p-4 relative w-full">
                                            {group.title && (
                                                <legend className="text-sm font-medium px-2 text-gray-700 bg-white -ml-1">
                                                    {group.title}
                                                </legend>
                                            )}
                                            <GroupRenderer group={group} />
                                        </fieldset>
                                    ))}
                                </div>
                                {/* Full width groups */}
                                {fullWidthGroups.map((group) => (
                                    <div key={group.key} className="col-span-2">
                                        <fieldset className="border border-gray-300 rounded-md p-4 relative">
                                            {group.title && (
                                                <legend className="text-sm font-medium px-2 text-gray-700 bg-white -ml-1">
                                                    {group.title}
                                                </legend>
                                            )}
                                            <GroupRenderer group={group} />
                                        </fieldset>
                                    </div>
                                ))}
                            </>
                        );
                    })()}
                </div>

                {/* Footer Actions */}
                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={handlePrev}
                        disabled={activeTab === 0}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer hover:text-gray-900"
                    >
                        Anterior
                    </button>

                    {activeTab < tabs.length - 1 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer hover:text-gray-900"
                        >
                            Siguiente
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer hover:brightness-105"
                    >
                        Guardar
                    </button>

                    <button
                        type="button"
                        onClick={handleSaveContinue}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer hover:brightness-105"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}

// Renders a group of widgets
function GroupRenderer({ group }) {
    return (
        <div className="space-y-4">
            {group.widgets.map((widget) => (
                <WidgetRenderer key={widget.key} widget={widget} />
            ))}
        </div>
    );
}

// StackedInline component for array fields
function StackedInline({ name, min = 1, max = 5, widgets, label }) {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
    const values = watch(name) || [];
    const canAdd = fields.length < max;
    const canRemove = fields.length > min;

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

// Renders individual widget, integrates with React Hook Form if `name` prop is provided
function WidgetRenderer({ widget }) {
    const { component: Component, props, variant, subWidgets: subWidgets, min, max, label } = widget;
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
