/**
 * GroupRenderer - Renders a group of widgets (fieldset) in the form.
 *
 * Supports meta properties:
 *   - hideOnToggle: { field: string, value?: boolean }
 *   - disableOnToggle: { field: string, value?: boolean }
 *
 * Props:
 *   group: { ... }, parentDisabled?: boolean
 *
 * Usage:
 *   <GroupRenderer group={group} parentDisabled={false} />
 */
import React from "react";
import { useFormContext } from "react-hook-form";
import WidgetRenderer from "./WidgetRenderer";
import useMetaToggle from "./useMetaToggle";

export default function GroupRenderer({ group, parentDisabled }) {
    const [hidden, disabled] = useMetaToggle(group);
    const methods = useFormContext();
    // If parentDisabled, group is also disabled
    const effectiveDisabled = parentDisabled || disabled;

    if (hidden) return null;
    return (
        <fieldset className="border border-gray-300 rounded-md p-4 relative w-full">
            {group.title && (
                <legend className="text-sm font-medium px-2 text-gray-700 bg-white -ml-1">
                    {group.title}
                </legend>
            )}
            <div className="space-y-4">
                {group.widgets.map((widget) => (
                    <WidgetRenderer key={widget.key} widget={widget} parentDisabled={effectiveDisabled} />
                ))}
            </div>
        </fieldset>
    );
} 