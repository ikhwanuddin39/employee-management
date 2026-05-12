import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ToastComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="w-full md:w-64 bg-slate-800 text-white flex flex-col md:min-h-screen shrink-0">
        <div class="p-4 border-b border-slate-700">
          <h1 class="text-xl font-bold tracking-wider">EMP SYS</h1>
        </div>
        
        <nav class="flex-1 p-4 space-y-2">
          <a routerLink="/employees" routerLinkActive="bg-slate-700" 
             [routerLinkActiveOptions]="{exact: true}"
             class="block px-4 py-2 rounded hover:bg-slate-700 transition-colors">
            Employee List
          </a>
          <a routerLink="/employees/add" routerLinkActive="bg-slate-700" 
             class="block px-4 py-2 rounded hover:bg-slate-700 transition-colors">
            Add Employee
          </a>
        </nav>

        <div class="p-4 border-t border-slate-700">
          <button (click)="logout()" class="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700 rounded transition-colors flex items-center gap-2">
            Logout
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-1 p-4 md:p-8 overflow-x-hidden">
        <div class="max-w-7xl mx-auto">
          <router-outlet></router-outlet>
        </div>
      </main>

      <!-- Global Toast Container -->
      <app-toast></app-toast>
    </div>
  `
})
export default class MainLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
