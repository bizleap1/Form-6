'use client'
import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  onClose: () => void
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex items-center gap-3 bg-navy text-white px-6 py-4 rounded-xl shadow-2xl animate-fade-up max-w-xs">
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white/50 hover:text-white text-lg leading-none">×</button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([])

  const showToast = (message: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3">
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}
