import { Component } from '@angular/core';
import { DoctorDetailsCardComponent } from './components/doctor-details-card/doctor-details-card.component';
import { DoctorFiltersComponent } from './components/doctor-filters/doctor-filters.component';
import { FieldsetModule } from "primeng/fieldset";
import { NavbarComponent } from '../../common/navbar/navbar.component';

@Component({
  selector: 'app-search-profesional',
  standalone: true,
  imports: [
    DoctorDetailsCardComponent,
    DoctorFiltersComponent,
    FieldsetModule,
    NavbarComponent
  ],
  templateUrl: './search-profesional.component.html',
  styleUrl: './search-profesional.component.scss'
})
export class SearchProfesionalComponent {}
