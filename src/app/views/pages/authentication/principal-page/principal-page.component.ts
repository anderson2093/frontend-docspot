import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ],
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.scss'
})
export class PrincipalPageComponent {
  isLogin = true; // Estado inicial

  toggleForm() {
    this.isLogin = !this.isLogin;
  }
}
