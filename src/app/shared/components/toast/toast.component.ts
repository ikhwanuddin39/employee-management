import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="px-4 py-3 rounded shadow-lg text-white font-medium flex items-center justify-between min-w-[250px] animate-fade-in"
          [ngClass]="{
            'bg-green-500': toast.type === 'success',
            'bg-yellow-500': toast.type === 'warning',
            'bg-red-500': toast.type === 'danger'
          }">
          <span>{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)" class="ml-4 text-white hover:text-gray-200">
            &times;
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
