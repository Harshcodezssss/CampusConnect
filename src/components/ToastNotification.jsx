import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-white border rounded-xl shadow-soft-xl max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`p-1.5 rounded-lg ${
        isSuccess ? 'bg-emerald-50 text-emerald-600' :
        isInfo ? 'bg-sky-50 text-sky-600' : 'bg-rose-50 text-rose-600'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5" />}
        {isInfo && <Info className="w-5 h-5" />}
        {isError && <AlertCircle className="w-5 h-5" />}
      </div>
      
      <p className="text-sm font-medium text-slate-700 flex-1">
        {toast.message}
      </p>

      <button
        onClick={onClose}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ToastNotification;

