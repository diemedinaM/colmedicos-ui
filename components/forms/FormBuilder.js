/**
 * FormBuilder - Main multi-tab form component using React Hook Form.
 *
 * Props:
 *   schema: {
 *     tabs: Array<{ key, label, groups }>,
 *     onSubmit: function,
 *     initialValues: object
 *   }
 *
 * Usage:
 *   <FormBuilder schema={...} />
 */
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import GroupRenderer from "./GroupRenderer";

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
                                        <GroupRenderer key={group.key} group={group} />
                                    ))}
                                </div>
                                <div className="col-span-1 w-full h-full flex flex-col gap-6">
                                    {rightGroups.map((group) => (
                                        <GroupRenderer key={group.key} group={group} />
                                    ))}
                                </div>
                                {/* Full width groups */}
                                {fullWidthGroups.map((group) => (
                                    <div key={group.key} className="col-span-2">
                                        <GroupRenderer group={group} />
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