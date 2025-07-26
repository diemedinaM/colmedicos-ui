/**
 * GroupRenderer - Renders a group of widgets (fieldset) in the form.
 *
 * Props:
 *   group: {
 *     key: string,
 *     title?: string,
 *     widgets: Array<WidgetSchema>
 *   }
 *
 * Usage:
 *   <GroupRenderer group={group} />
 */
import React from "react";
import WidgetRenderer from "./WidgetRenderer";

export default function GroupRenderer({ group }) {
    return (
        <fieldset className="border border-gray-300 rounded-md p-4 relative w-full">
            {group.title && (
                <legend className="text-sm font-medium px-2 text-gray-700 bg-white -ml-1">
                    {group.title}
                </legend>
            )}
            <div className="space-y-4">
                {group.widgets.map((widget) => (
                    <WidgetRenderer key={widget.key} widget={widget} />
                ))}
            </div>
        </fieldset>
    );
} 