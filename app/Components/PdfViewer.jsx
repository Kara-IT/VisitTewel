"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function PdfViewer({ book, onClose }) {
  const [iframeKey, setIframeKey] = useState(0);

  // Disable right-click and keyboard shortcuts for download
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.key === "s") ||
        (e.ctrlKey && e.key === "p") ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-[90vh] max-w-6xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 truncate">
              {book.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Tutup"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <iframe
            key={iframeKey}
            src={`${book.file}#toolbar=0&navpanes=0`}
            className="w-full h-full border-none"
            title={book.title}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>

        {/* Footer Info */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <span>{book.title}</span>
          <span className="text-xs">Baca hanya - Unduhan dinonaktifkan</span>
        </div>
      </div>
    </div>
  );
}
