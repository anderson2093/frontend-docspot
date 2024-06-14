import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SearchProfessionalService } from '../../../../../services/search-professional/search-professional.service';
import {
  Professional,
  Specialty,
} from '../../../../../models/search-professional-models/searchProfessional.model';
import { ProfessionalBySpecialty } from 'src/app/models/search-professional-models/professionalBySpecialty.model';

@Component({
  selector: 'app-doctor-filters',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    CardModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './doctor-filters.component.html',
  styleUrl: './doctor-filters.component.scss',
})
export class DoctorFiltersComponent implements OnInit {
  public doctorFiltersForm: FormGroup = this._fb.group({});

  public specialties: Specialty[] = [];
  public professionals: Professional[] = [];
  //public professionalsBySpecialty: ProfessionalBySpecialty[] = [];

  public descendantReputation: boolean = true;
  public descendantPrice: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private _searchProfessionalService: SearchProfessionalService
  ) {}

  ngOnInit(): void {
    this.getSpecialties();
    this.initForm();
  }

  initForm(): void {
    this.doctorFiltersForm = this._fb.group({
      idSpecialty: ['', [Validators.required]],
    });
  }

  getSpecialties(): void {
    this._searchProfessionalService.getSpecialties().subscribe({
      next: (res) => (this.specialties = res),
    });
  }

  /*searchSpecialty(): void {
    const id = this.doctorFiltersForm.controls['idSpecialty'].value;

    this._searchProfessionalService.getSpecialtyById(id).subscribe({
      next: (res) => console.log(res),
    });
  }*/
  getProfessionalsBySpecialtyId(): void {
    const selectedSpecialtyId =
      this.doctorFiltersForm.controls['idSpecialty'].value;
    this._searchProfessionalService
      .getProfessionalsBySpecialtyId(selectedSpecialtyId)
      .subscribe({
        next: (res) => {
          this.professionals = res;
          console.log(this.professionals);
          this._searchProfessionalService.setProfessionalData(
            this.professionals
          );
        },
      });
  }

  sortReputation(): void {
    const professional: Professional[] =
      this._searchProfessionalService.getProfessionalData();
    this.descendantReputation = !this.descendantReputation;

    const sortProfessionalByReputation = this.descendantReputation
      ? professional.sort((a, b) => a.reputation - b.reputation).reverse()
      : professional.sort((a, b) => a.reputation - b.reputation);

    this._searchProfessionalService.setProfessionalData(
      sortProfessionalByReputation
    );
  }

  sortPrice(): void {
    const professional: Professional[] =
      this._searchProfessionalService.getProfessionalData();
    this.descendantPrice = !this.descendantPrice;

    /* La función sort nos devuelve un arreglo ascendente, así que cuando queremos un arreglo descendente, hacemos el .reverse() */
    const sortProfessionalsByPrice = this.descendantPrice
      ? professional.sort((a, b) => a.valueQuery - b.valueQuery).reverse()
      : professional.sort((a, b) => a.valueQuery - b.valueQuery);

    this._searchProfessionalService.setProfessionalData(
      sortProfessionalsByPrice
    );
  }
}
