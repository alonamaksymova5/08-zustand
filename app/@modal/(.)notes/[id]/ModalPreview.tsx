"use client";

import css from "./ModalPreview.module.css";

type ModalPreviewProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function ModalPreview({ children, onClose }: ModalPreviewProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
