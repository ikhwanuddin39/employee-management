import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'warning' | 'danger';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType): void {
    const id = crypto.randomUUID();
    const newToast: Toast = { id, message, type };
    
    this.toasts.update((current) => [...current, newToast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
  }
}
