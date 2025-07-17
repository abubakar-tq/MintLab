"use client";
import { useState } from "react";
import { X, Info } from "lucide-react";

export default function AttributeInput({ onAttributesChange }) {
  const [attributes, setAttributes] = useState([]);

  const handleAdd = () => {
    const updated = [...attributes, { trait_type: "", value: "" }];
    setAttributes(updated);
    onAttributesChange?.(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
    onAttributesChange?.(updated);
  };

  const handleRemove = (index) => {
    const updated = attributes.filter((_, i) => i !== index);
    setAttributes(updated);
    onAttributesChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between">
        <label className="text-lg font-semibold tracking-wide px-2">
          Attributes
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="text-blue-600 text-sm font-medium border border-blue-400 rounded-lg py-2 px-4 hover:bg-blue-50"
        >
          + Add Trait
        </button>
      </div>

      {attributes.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-gray-400 border border-dashed rounded-md p-4 py-6 text-sm justify-center">
          <Info className="w-5 h-5" />
          <p>No attributes added yet</p>
        </div>
      ) : (
        attributes.map((attr, index) => (
          <div
            key={index}
            className="flex gap-2 items-center p-4 bg-gray-100 rounded-lg"
          >
            <input
              type="text"
              placeholder="Trait type (e.g., Color)"
              value={attr.trait_type}
              onChange={(e) =>
                handleChange(index, "trait_type", e.target.value)
              }
              className="w-1/2 px-3 py-2 border rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Value (e.g., Blue)"
              value={attr.value}
              onChange={(e) =>
                handleChange(index, "value", e.target.value)
              }
              className="w-1/2 px-3 py-2 border rounded-md text-sm"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700"
              aria-label="Remove Trait"
            >
              <X size={16} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
