"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { adminService } from "@/services/core/adminService";
import { FaChevronDown } from "react-icons/fa";

const modelDataCache = new Map();

if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", () => {
        modelDataCache.clear();
    });
}

/**
 * SimpleModelDropdown - A dropdown/select input that fetches and displays options from a backend model.
 * Useful for static or rarely-changing lists.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - The field name for form state (required).
 * @param {string} [props.label] - The label for the dropdown.
 * @param {string} props.appName - The backend app name for fetching options (required).
 * @param {string} props.modelName - The backend model name for fetching options (required).
 * @param {string} [props.displayField] - The field to display in the dropdown (default: "name").
 * @param {Object} [props.params] - Additional query parameters for fetching options.
 * @param {Object|string} [props.value] - The selected value.
 * @param {function} [props.onChange] - Callback for selection changes.
 * @param {boolean} [props.disabled] - Disables the dropdown if true.
 * @param {string} [props.tooltip] - Tooltip help text.
 *
 * @example
 * <SimpleModelDropdown
 *   name="country"
 *   label="Country"
 *   appName="common"
 *   modelName="country"
 *   displayField="name"
 *   value={country}
 *   onChange={setCountry}
 *   tooltip="Select your country of residence."
 * />
 */
export default function SimpleModelDropdown({
    name,
    label,
    appName,
    modelName,
    params = {},
    displayField = "name",
    disabled = false,
    value,
    onChange,
}) {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        if (disabled) return;
        const key = `${appName}:${modelName}:${JSON.stringify(params)}`;
        if (modelDataCache.has(key)) {
            setItems(modelDataCache.get(key));
        } else {
            adminService.getModelData(appName, modelName, params)
                .then((res) => {
                    const results = res?.results ?? [];
                    modelDataCache.set(key, results);
                    setItems(results);
                })
                .catch(console.error);
        }
    }, [appName, modelName, params, disabled]);

    useEffect(() => {
        if (disabled) {
            onChange(null);
        }
    }, [disabled]);

    // Filter memoized so typing elsewhere won't remount
    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return items.filter((item) =>
            String(item[displayField]).toLowerCase().includes(q)
        );
    }, [items, search, displayField]);

    return (
        <div className="flex items-start gap-4 w-full">
            {label && (
                <label className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="relative w-full max-w-md" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => !disabled && setOpen((o) => !o)}
                    className={`w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center ${disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={disabled}
                >
                    <span className={value ? "text-gray-900" : "text-gray-400"}>
                        {value ? value[displayField] : `Seleccione ${label}`}
                    </span>
                    <FaChevronDown className="text-gray-400 ml-2" />
                </button>

                {open && !disabled && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <input
                            type="text"
                            placeholder="Type to filter..."
                            className="w-full border-b px-3 py-2 text-sm focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ul className="max-h-60 overflow-y-auto text-sm">
                            {filtered.length > 0 ? (
                                filtered.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => {
                                            onChange(item); // drive form state
                                            setOpen(false);
                                        }}
                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
                                    >
                                        {item[displayField]}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-gray-500 italic">No matches</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div >
    );
}
