"use client";

import React, { useState } from "react";
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
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
        <div className="grid grid-cols-2 gap-6">
          {tabs[activeTab].groups.map((group) => (
            <div
              key={group.key}
              className={group.variant === "fullWidth" ? "col-span-2" : "col-span-1"}
            >
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

// Renders individual widget, integrates with React Hook Form if `name` prop is provided
function WidgetRenderer({ widget }) {
  const { component: Component, props } = widget;
  const { control } = useFormContext();

  if (props.name) {
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Component {...props} value={field.value} onChange={field.onChange} />
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

  return <Component {...props} />;
}
