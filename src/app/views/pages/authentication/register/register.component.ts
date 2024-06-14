import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  Storage as StorageFire,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { UploadImageComponent } from 'src/app/views/common/upload-image/upload-image.component';
import {
  ProfessionalRegister,
  Specialty,
  registerPatient,
  registerProfessional,
} from 'src/app/models/authentication-models/register.models';
import { Observable, finalize, map, startWith } from 'rxjs';
import { SpecialtyService } from 'src/app/services/service-specialty/specialty.service';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { RegisterService } from 'src/app/services/service-register/register.service';
import { DialogService } from 'src/app/services/component/service-dialog/dialog.service';
import { DialogDataDto } from 'src/app/models/components/common/dialog.model';

enum Rol {
  professional = 'ROLE_PROFESSIONAL',
  patient = 'ROLE_PATIENT',
}

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [SpecialtyService, RegisterService, DialogService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatChipsModule,
    UploadImageComponent,
  ],
})
export class RegisterComponent implements OnInit {
  public disabledProfessional: boolean = false;
  public specDefault: Specialty[] = [];

  public selectedRol = Rol;

  public rol: string = '';
  public register!: FormGroup;
  public specialtyAuto!: FormControl;
  public showPassword: boolean = true;
  public loading: boolean = false;
  public errorMessage: string = '';

  public showForm: string = '';
  public showTouched: boolean = false;

  public hasWorkAdded: boolean = false;
  public specAvailable: Specialty[] = [];
  public specSelect: Specialty[] = [];
  public specFiltered!: Observable<Specialty[]>;

  public receivedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private storageFire: StorageFire,
    private specialtyService: SpecialtyService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.getSpecialties();
    this.initializedForm();
  }

  private suscribeAutocomplete(formG: FormGroup): void {
    const specInput = formG.get('specialtyAuto') as FormControl;
    if (specInput) {
      this.specFiltered = specInput.valueChanges.pipe(
        startWith(''),
        map((specialties: string | Specialty) =>
          typeof specialties === 'string'
            ? this._filter(this.specAvailable, specialties)
            : this._filter(this.specAvailable, specialties.nameSpecialty)
        )
      );
    }
  }

  private getSpecialties(): void {
    // llamar a la api en busca de especialidades
    // loading:true;
    console.log('Inicio de Especialidad:', this.specAvailable);
    this.disabledProfessional = true;
    this.specialtyService.getSpecialties().subscribe({
      next: (res: HttpResponse<Specialty[]>) => {
        // cargar los objetos
        this.specAvailable = res.body ?? [];
        this.disabledProfessional = false;
        console.log('Fin de Especialidad:', this.specAvailable);
        // loading:false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('error Especialidad', error);
        this.disabledProfessional = false;
        console.log('Fin de Especialidad:', this.specAvailable);
        // loading:false;
      },
    });
  }

  private _filter(specialties: Specialty[], search?: string): Specialty[] {
    if (!search) return specialties;
    const filtered = specialties.filter((specialty) =>
      specialty.nameSpecialty
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase())
    );
    return filtered;
  }

  private initializedForm(): void {
    this.register = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
  }

  public selectPacient(): void {
    this.showTouched = true;
    this.toggleExtraControls(this.selectedRol.patient);
    this.showForm = this.selectedRol.patient;
    this.register.get('rol')?.patchValue(this.selectedRol.patient);
  }

  public selectProfessional(): void {
    this.showTouched = true;
    this.toggleExtraControls(this.selectedRol.professional);
    this.showForm = this.selectedRol.professional;
    this.register.get('rol')?.patchValue(this.selectedRol.professional);
  }

  /* intercambio de formulario por button */
  public toggleExtraControls(role: string): void {
    // this.initializedForm();

    if (role == this.selectedRol.professional) {
      this.addControlsProfessional(this.register);
      this.removeControlsPatient(this.register);
      this.suscribeAutocomplete(this.register);
    } else if (role == this.selectedRol.patient) {
      this.addControlsPatient(this.register);
      this.removeControlsProfessional(this.register);
      // this.listenCheckBox(this.register);
    }
  }

  /* Escuchar cambios en el checkbox */
  // private listenCheckBox(formG: FormGroup): void {
  //   formG.get('hasWork')?.valueChanges.subscribe((hasSocialWork) => {
  //     if (hasSocialWork) {
  //       formG.get('socialWork')?.enable();
  //     } else {
  //       formG.get('socialWork')?.disable();
  //       formG.get('socialWork')?.setValue('');
  //       formG.get('socialWork')?.markAsUntouched();
  //     }
  //   });
  // }

  /* Cambio de formulario Profesional */
  private addControlsProfessional(formG: FormGroup): void {
    formG.addControl('mp', new FormControl('', Validators.required));
    formG.addControl('specialties', new FormControl(this.specSelect));
    formG.addControl('specialtyAuto', new FormControl(''));
    formG.addControl('valueQuery',new FormControl(''));
  }

  private removeControlsPatient(formG: FormGroup): void {
    this.hasWorkAdded = false;
    formG.removeControl('cellphone');
    formG.removeControl('photo');
    // formG.removeControl('hasWork');
    // formG.removeControl('socialWork');
  }
  /* FIN - Cambio de formulario Profesional */

  /* Cambio de formulario Paciente */
  private addControlsPatient(formG: FormGroup): void {
    formG.addControl('cellphone', new FormControl('', Validators.required));
    formG.addControl(
      'photo',
      new FormControl('photo1.jpg', Validators.required)
    );
    // formG.addControl(
    //   'hasWork',
    //   new FormControl({ value: false, disabled: false }, Validators.required)
    // );
    // formG.addControl(
    //   'socialWork',
    //   new FormControl({ value: '', disabled: true }, Validators.required)
    // );
    this.hasWorkAdded = true;
  }

  private removeControlsProfessional(formG: FormGroup): void {
    formG.removeControl('mp');
    formG.removeControl('specialties');
    formG.removeControl('specialtyAuto');
    formG.removeControl('valueQuery');
  }
  /* FIN - Cambio de formulario Paciente */

  /* Control especialidad */
  public addSpecialty(specialty: Specialty): void {
    if (specialty && !this.specSelect.includes(specialty)) {
      this.specSelect.push(specialty);
      this.DeleteSpecialtyAvailable(specialty);
    }
  }

  public DeleteSpecialty(specialty: Specialty): void {
    const index = this.specSelect.indexOf(specialty);
    if (index !== -1) {
      this.specSelect.splice(index, 1);
      this.addSpecialtyAvailable(specialty);
    }
  }

  public DeleteSpecialtyAvailable(specialty: Specialty): void {
    let arrayRef = [];
    const index = this.specAvailable.indexOf(specialty);
    if (index !== -1) {
      this.specAvailable.splice(index, 1);
      arrayRef = [...this.specAvailable];
      this.specAvailable = [...arrayRef];
    }
  }

  public addSpecialtyAvailable(specialty: Specialty): void {
    this.specAvailable.push(specialty);
  }
  /* FIN - Control especialidad */

  /* NEW control especialidad AutoComplete*/
  public selected(event: MatAutocompleteSelectedEvent): void {
    const specialty = event.option.value;
    if (event && !this.specSelect.includes(specialty)) {
      this.specSelect.push(specialty);
      this.DeleteSpecialtyAvailable(specialty);
      this.register.get('specialtyAuto')?.setValue('');
    }
  }

  public displaySpecialty(spec: Specialty): string {
    return spec ? spec.nameSpecialty : '';
  }
  /* FIN - new control especialidad */

  /* Recibir imagen del componente */
  public onFileReceived(file: File | null) {
    console.log('File received in parent component:', file);
    this.receivedFile = file;
  }
  /* Din - Recibir imagen del componente */

  /* Carga de imagen a firebase y retorno de urlDownload */
  private uploadImage(file: File | null): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('');
        return;
      }

      const fileToUp = file;
      console.log('archivo para subir: ', fileToUp);
      let name = this.register.get('name')?.value;
      let email = this.register.get('email')?.value;
      // const imgRef = ref(this.storageFire, `images/${fileToUp.name}`);
      const imgRef = ref(this.storageFire, `images/${name}-${email}`);

      uploadBytes(imgRef, fileToUp)
        .then((response) => {
          console.log('Respuesta: ', response);

          return getDownloadURL(imgRef);
        })
        .then((downLoadURL: string) => {
          resolve(downLoadURL);
        })
        .catch((error) => {
          console.log('Error: ', error);
          reject('');
        });
    });
  }
  /* Fin - Carga de imagen a firebase y retorno de urlDownload */

  public async send(): Promise<void> {
    console.log('Form:', this.register.value);
    console.log('Form format:', this.register.value);

    if (this.register.invalid) {
      console.log('Form invalid:', this.register);
      console.log('formulario invalido');
      return;
    }
    if (this.showForm == this.selectedRol.patient) {
      // if (!this.receivedFile) return;
      // subir imagen y esperar string para agregar al formulario
      // let pathImage = await this.uploadImage(this.receivedFile);
      // if (!pathImage) return;
      // this.register.get('photo')?.setValue(pathImage);
      // pasar data a un objeto para crear paciente
      let patientDto: registerPatient = {} as registerPatient;
      this.loadDataFormPatient(patientDto, this.register);
      console.log('envio backend: ', patientDto);

      this.dialogService.openLoadingWindow();
      this.registerService.registerPatient(patientDto).pipe(
        finalize(() => this.dialogService.closeDialog())
      ).subscribe({
        next: (res: HttpResponse<any>) => {
          // loading=false;
          console.log('response: ', res);
          console.log('response status:', res.status);
          if (res.status === 200) {
            let data:DialogDataDto = this.loadSuccessResponse();
            this.dialogService.openSuccessDialog(data).subscribe(
              () => {
                this.navLogin();
                return;
              }
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          // loading=false;
          let data:DialogDataDto = this.loadErrorResponse();
          this.dialogService.openAlertDialog(data).subscribe(
            () => {
              return;
            }
          );
        },
      });
      // llamar a la API
      // controlar respuesta
      //  -- exitoso -> volver a login
      //  -- falla -> mostrar modal
    } else if (this.showForm == this.selectedRol.professional) {
      if (this.specSelect.length === 0) return;
      // pasar data a un objeto para crear professional
      let professionalDto: registerProfessional = {} as registerProfessional;
      this.loadDataFormProfessional(professionalDto, this.register);
      console.log('backend:', professionalDto);
      this.dialogService.openLoadingWindow();
      this.registerService.registerProfessional(professionalDto).pipe(
        finalize(() => this.dialogService.closeDialog())
      ).subscribe({
        next: (res: HttpResponse<any>) => {
          // loading=false;
          console.log('response: ', res);
          console.log('response status:', res.status);
          if (res.status === 200) {
            let data:DialogDataDto = this.loadSuccessResponse();
            this.dialogService.openSuccessDialog(data).subscribe(
              () => {
                this.navLogin();
                return;
              }
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          // loading=false;
          let data:DialogDataDto = this.loadErrorResponse();
          this.dialogService.openAlertDialog(data).subscribe(
            () => {
              return;
            }
          );
        },
      });
    }

    console.log('Enviar formulario');
  }

  private loadErrorResponse():DialogDataDto {
    let dataError:DialogDataDto = {
      tittle: "Error",
      content: "Registro fallido",
      actions: [{
        name:"Volver",
        returnValue: true,
      }]
    }
    return dataError;
  }

  private loadSuccessResponse():DialogDataDto {
    let dataSuccess:DialogDataDto = {
      tittle: "¡Bienvenido!",
      content: "Se registró correctamente",
      actions: [{
        name:"Ok",
        returnValue: true,
      }]
    }
    return dataSuccess;
  }

  private loadDataFormPatient(patientData: registerPatient, FormG: FormGroup) {
    patientData.email = FormG.get('email')?.value;
    patientData.password = FormG.get('password')?.value;
    patientData.nameUser = FormG.get('name')?.value;
    patientData.nameRole = FormG.get('rol')?.value;

    patientData.cellphonePatient = FormG.get('cellphone')?.value;
    // patientData.hasSocialWork = FormG.get('hasWork')?.value;
    // patientData.socialWork = FormG.get('socialWork')?.value;

    // patientData.photoPatient = FormG.get('photo')?.value;
  }

  private loadDataFormProfessional(
    professionalData: registerProfessional,
    FormG: FormGroup
  ) {
    professionalData.email = FormG.get('email')?.value;
    professionalData.password = FormG.get('password')?.value;
    professionalData.nameUser = FormG.get('name')?.value;
    professionalData.nameRole = FormG.get('rol')?.value;

    professionalData.mp = FormG.get('mp')?.value;
    professionalData.valueQuery = FormG.get('valueQuery')?.value;
    professionalData.specialties = FormG.get('specialties')?.value.map(
      (spec: Specialty) => spec.idSpecialty
    ) ?? [];
  }

  public navLogin(): void {
    event?.preventDefault();
    this.router.navigate(['/auth/login']);
  }
}
