import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AvatarModule } from 'primeng/avatar'
import { CardModule } from 'primeng/card';
import { Service } from 'src/app/models/home-models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    AvatarModule,
    CardModule,
    CommonModule,
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCardComponent {

  // ! A cada objeto le faltaría la propiedad del icono
  public services:Service[] = [
    {
      icon:'assets/images/medical-appointment.png',
      alt: 'Consulta Médica Online',
      title: 'Consulta Médica Online',
      description: 'Habla con médicos calificados desde la comodidad de tu hogar. Realiza tus consultas sin salir de casa.',
    },
    {
      icon:'assets/images/medical-record.png',
      alt: '',
      title: 'Historial Médico Online',
      description: 'Accede a tu historial médico, recetas y resultados de laboratorio en un solo lugar.'
    },
    {
      icon:'assets/images/reserve-medical-appointment.png',
      alt: 'Reservar cita médica',
      title: 'Reserva Fácil y Rápida',
      description: 'Encuentra especialistas, agenda citas y recibe confirmaciones al instante.'
    }
  ]
}
