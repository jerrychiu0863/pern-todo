// src/components/Modal.jsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  // // Close on Escape key
  // useEffect(() => {
  //   if (!isOpen) return;
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Escape") onClose();
  //   };
  //   document.addEventListener("keydown", handleKeyDown);
  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, [isOpen, onClose]);

  // // Prevent background scroll while modal is open
  // useEffect(() => {
  //   if (!isOpen) return;
  //   const originalOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = originalOverflow;
  //   };
  // }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    // Only close if the click was on the backdrop itself, not inside the modal
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className="w-full max-w-md rounded-lg bg-white shadow-lg"
      >
        <div className="flex items-center justify-between bg-blue-100 p-3 rounded-lg rounded-b-[0px]">
          {title && (
            <h2
              id="modal-title"
              className="text-lg font-semibold text-gray-800"
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
