"use client";

import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

export default function ToastNotification({
  message,
  onClose,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="alert alert-info shadow-lg p-4 flex items-center gap-2">
        <CheckCircle className="h-6 w-6 shrink-0 stroke-current" />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
