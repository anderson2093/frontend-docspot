import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { Professional } from 'src/app/models/search-professional-models/searchProfessional.model';
import { SearchProfessionalService } from 'src/app/services/search-professional/search-professional.service';

@Component({
  selector: 'app-doctor-details-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './doctor-details-card.component.html',
  styleUrl: './doctor-details-card.component.scss',
})
export class DoctorDetailsCardComponent implements OnInit {
  public doctorDetailsForm: FormGroup = this._fb.group({});
  public professionals: Professional[] = [];

  constructor(
    private _fb: FormBuilder,
    private _searchProfessionalService: SearchProfessionalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProfessionals();
    this._searchProfessionalService.getProfessionalDataSub().subscribe(
      (data) => {
        // if(data.length > 0) {
          this.professionals = [...data];
          console.log("data:", this.professionals);
          this.cdr.detectChanges();
        // }
      }
    );
  }

  getProfessionals(): void {
    this._searchProfessionalService.getProfessionals().subscribe({
      next: (res) => {
        this.professionals = res;
        this._searchProfessionalService.setProfessionalData(this.professionals);
      },
    });
  }

  roundDown(value: number): number {
    return Math.floor(value);
  }
}
