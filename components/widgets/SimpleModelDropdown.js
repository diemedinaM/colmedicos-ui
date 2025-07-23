"use client";

import { useEffect, useState, useMemo } from "react";
import { adminService } from "@/services/core/adminService";
import { FaChevronDown } from "react-icons/fa";

const modelDataCache = new Map();

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    modelDataCache.clear();
  });
}

export default function SimpleModelDropdown({
  name,
  appName,
  modelName,
  displayField = "name",
  value,
  onChange,
}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = `${appName}:${modelName}`;
    if (modelDataCache.has(key)) {
      setItems(modelDataCache.get(key));
    } else {
      adminService.getModelData(appName, modelName)
        .then((res) => {
          const results = res?.results ?? [];
          modelDataCache.set(key, results);
          setItems(results);
        })
        .catch(console.error);
    }
  }, [appName, modelName]);

  // Filter memoized so typing elsewhere won't remount
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) =>
      String(item[displayField]).toLowerCase().includes(q)
    );
  }, [items, search, displayField]);

  return (
    <div className="flex items-start gap-4 w-full">
      {name && (
        <label className="w-32 text-right pt-2 text-sm font-medium text-gray-700">
          {name}
        </label>
      )}

      <div className="relative w-full max-w-md">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center"
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {value ? value[displayField] : `Select ${modelName}`}
          </span>
          <FaChevronDown className="text-gray-400 ml-2" />
        </button>

        {open && (
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
    </div>
  );
}
