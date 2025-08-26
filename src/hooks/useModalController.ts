import { useState, useCallback } from "react";

export function useModalController() {
    const [isOpen, setIsOpen] = useState(false);
    const [meta, setMeta] = useState<any>(null);
    const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
    const dismiss = useCallback(() => setIsOpen(false), [setIsOpen]);
    const open = useCallback(() => setIsOpen(true), [setIsOpen]);

    return {
      isOpen,
      meta,
      setMeta,
      toggle,
      dismiss,
      open,
    };
  }
  