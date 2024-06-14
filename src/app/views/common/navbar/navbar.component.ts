import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  // ? Crear interfaz
  public menuItems = [
    { label: 'Inicio', path: '/home' },
    { label: 'Servicios', path: '#' },
    { label: 'Buscar Médicos', path: '/doctors/list' },
  ];

  public showUserMenu: boolean = false;
  public name: string | null = null;
  public initial: string | null = null;

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    if (this.name) {
      this.initial = this.name.charAt(0).toUpperCase();
      console.log('Letra inicial de usuario:', this.initial);
    } else {
      console.log('No has iniciado sesión');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    window.location.reload(); // Optional: To refresh the view
  }
}
