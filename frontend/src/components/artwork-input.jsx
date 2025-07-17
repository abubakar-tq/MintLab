"use client";
import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

export default function ArtworkUpload({ onFileSelect }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onFileSelect?.(file); // Send file to parent

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect?.(null); // Clear file in parent too
    document.getElementById("artworkInput").value = "";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-semibold text-lg text-gray-900">Artwork</label>

      <div
        className="relative border-2 border-dashed border-gray-300 rounded-md p-6 w-full flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 transition"
        onClick={() => document.getElementById("artworkInput").click()}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Artwork Preview"
              className="max-w-xs max-h-64 object-contain rounded-md"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1"
              aria-label="Remove artwork"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud className="w-8 h-8" />
            <p className="font-medium text-lg text-gray-800 tracking-wide">
              Drop your image here or click to upload
            </p>
            <p className="text-xs text-gray-400">
              Supports PNG, JPEG, and SVG files
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        id="artworkInput"
        accept=".png,.jpeg,.jpg,.svg"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
