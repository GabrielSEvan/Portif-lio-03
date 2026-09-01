import React, { useEffect } from 'react';
import { CheckCircle, X, Sparkles } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'welcome';
  duration?: number;
}

interface ToastNotificationProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      id="welcome-toast-container"
      className="fixed top-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#00005c]/95 border border-[#2f15ed]/60 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
        {/* Accent Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2f15ed] via-[#00f0ff] to-[#ff2e63]" />

        <div className="flex items-start gap-3.5">
          {/* Icon Badge */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#2f15ed]/20 border border-[#2f15ed]/50 flex items-center justify-center text-emerald-400">
            {toast.type === 'welcome' ? (
              <Sparkles className="w-5 h-5 text-[#00f0ff] animate-pulse" />
            ) : (
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="text-sm font-bold text-white font-display flex items-center gap-2 truncate">
              {toast.title}
            </h4>
            <p className="text-xs text-zinc-300 font-mono-code mt-1 leading-relaxed">
              {toast.message}
            </p>
          </div>

          {/* Close button */}
          <button
            id="dismiss-toast-btn"
            onClick={onDismiss}
            className="flex-shrink-0 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#070448] transition-colors"
            title="Fechar notificação"
            aria-label="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar indication */}
        <div className="mt-3.5 w-full bg-[#070448] rounded-full h-1 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#2f15ed] to-[#00f0ff] h-full rounded-full animate-[progress_5s_linear_forwards]"
            style={{ animationDuration: `${toast.duration || 5000}ms` }}
          />
        </div>
      </div>
    </div>
  );
};
