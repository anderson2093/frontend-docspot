import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpecialtyCardComponent } from '../specialty-card/specialty-card.component';


@Component({
  selector: 'app-specialties-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SpecialtyCardComponent,
  ],
  templateUrl: './specialties-section.component.html',
  styleUrl: './specialties-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecialtiesSectionComponent { }
