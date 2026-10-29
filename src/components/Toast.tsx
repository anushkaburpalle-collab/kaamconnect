import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-forest-950 text-cream-50 p-4 rounded-2xl shadow-float border border-forest-800 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-250"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-lime" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-sky-400" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-cream-50 leading-tight">
              {toast.title}
            </h4>
            {toast.message && (
              <p className="text-[11px] text-cream-300 mt-0.5 leading-snug">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-cream-400 hover:text-cream-100 p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
