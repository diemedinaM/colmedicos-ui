"use client";

import React, { useState } from "react";
import { useForm, FormProvider, Controller, useFormContext } from "react-hook-form";

// Types for schema
// Removed TypeScript type definitions

// Main FormBuilder component
export default function FormBuilder({ schema }) {
  const { tabs, onSubmit, initialValues } = schema;
  const methods = useForm({ defaultValues: initialValues });
  const [activeTab, setActiveTab] = useState(0);

  const handlePrev = () => setActiveTab((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));

  const handleSave = methods.handleSubmit(onSubmit);
  const handleSaveContinue = methods.handleSubmit((data) => {
    onSubmit(data);
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-6">
        {/* Tab Headers */}
        <div className="border-b">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            {tabs.map((tab, idx) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 font-medium text-sm focus:outline-none border-b-2 ${
                  idx === activeTab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Tab Content */}
        <div className="grid grid-cols-2 gap-6">
          {tabs[activeTab].groups.map((group) => (
            <div
              key={group.key}
              className={
                group.variant === "fullWidth" ? "col-span-2" : "col-span-1"
              }
            >
              <GroupRenderer group={group} />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeTab === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {activeTab < tabs.length - 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Next
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={handleSaveContinue}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save & Continue
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

  // If the widget has a `name` prop, bind it to RHF
  if (props.name) {
    return (
      <Controller
        name={props.name}
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <Component
                {...props}
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

  // Otherwise render normally
  return <Component {...props} />;
}
