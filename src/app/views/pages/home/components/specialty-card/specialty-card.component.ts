import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpecialtyCard } from 'src/app/models/home-models/specialty-card.model';

@Component({
  selector: 'app-specialty-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './specialty-card.component.html',
  styleUrl: './specialty-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtyCardComponent {

  public specialties:SpecialtyCard[] = [
    {
      icon: 'assets/images/cardiology.png',
      alt: 'Cardiología',
      title: 'Cardiología'
    },
    {
      icon: 'assets/images/dermatology.png',
      alt: 'Dermatología',
      title: 'Dermatología'
    },
    {
      icon: 'assets/images/medicine.png',
      alt: 'Medicina General',
      title: 'Medicina General',
    },
    {
      icon: 'assets/images/gynaecology.png',
      alt: 'Ginecología',
      title: 'Ginecología'
    }
  ]
}
