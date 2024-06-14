import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HomeMainSectionComponent } from './components/home-main-section/home-main-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { SpecialtiesSectionComponent } from './components/specialties-section/specialties-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HomeMainSectionComponent,
    ServicesSectionComponent,
    SpecialtiesSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
