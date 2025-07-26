"use client";

import { useRef, useState, useEffect } from "react";
import { FaUpload, FaPen, FaTrashAlt, FaSave } from "react-icons/fa";
import clsx from "clsx";

export default function SimpleSignatureInput({ name, label, value, onChange }) {
  const [tab, setTab] = useState("upload"); // "upload" | "draw"
  // const [preview, setPreview] = useState(value || null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // ========= Canvas Drawing Logic =========
  const startDraw = (e) => {
    isDrawing.current = true;
    draw(e);
  };

  const endDraw = () => {
    isDrawing.current = false;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  };

  const saveCanvas = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    // setPreview(dataUrl);
    onChange(dataUrl);
  };

  // ========= File Upload =========
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // setPreview(dataUrl);
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-xl border border-gray-300 rounded-md p-4">
        {label && <label className="w-32 text-right pt-2 text-sm font-medium text-gray-700">{label}</label>}

        {/* Tab Selector */}
        <div className="flex border-b mb-3">
          <button
            type="button"
            onClick={() => setTab("upload")}
            className={clsx(
              "px-4 py-2 text-sm font-medium flex items-center gap-2",
              tab === "upload"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            )}
          >
            <FaUpload /> Subir Archivo
          </button>
          <button
            type="button"
            onClick={() => setTab("draw")}
            className={clsx(
              "px-4 py-2 text-sm font-medium flex items-center gap-2",
              tab === "draw"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            )}
          >
            <FaPen /> Firmar Digitalmente
          </button>
        </div>

        {/* Content */}
        {tab === "upload" && (
          <div className="border border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="block text-gray-600 cursor-pointer">
              <div className="text-3xl mb-2">📤</div>
              Arrastra una imagen aquí o haz clic para seleccionar<br />
              <span className="text-sm text-gray-500">Formatos soportados: JPG, PNG, GIF (máx. 2MB)</span>
            </label>
          </div>
        )}

        {tab === "draw" && (
          <div className="flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="border rounded bg-white"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
            />
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
              >
                <FaTrashAlt /> Limpiar
              </button>
              <button
                type="button"
                onClick={saveCanvas}
                className="flex items-center gap-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                <FaSave /> Guardar Firma
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Dibuja tu firma en el área de arriba</p>
          </div>
        )}

        {/* Preview of saved signature */}
        {value && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">Vista previa de la firma:</p>
            <img src={value} alt="Firma guardada" className="max-w-xs border rounded shadow" />
          </div>
        )}

        {!value && (
          <p className="mt-4 text-sm text-gray-500 text-center">
            Puedes subir una imagen de tu firma o crearla digitalmente usando el canvas.
          </p>
        )}
      </div>
    </div>
  );
}
