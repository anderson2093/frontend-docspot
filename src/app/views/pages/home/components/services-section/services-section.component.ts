import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ServiceCardComponent } from '../service-card/service-card.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    CommonModule,
    ServiceCardComponent,
  ],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent { }
