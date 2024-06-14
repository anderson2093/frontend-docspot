import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { userLogin } from 'src/app/models/authentication-models/login.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthV1Service } from 'src/app/services/service-authentication/auth-v1.service';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginResponse } from 'src/app/models/authentication-models/login-response.model';
import { DialogService } from 'src/app/services/component/service-dialog/dialog.service';
import { DialogDataDto } from 'src/app/models/components/common/dialog.model';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthV1Service],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public showPassword: boolean = false;
  public loading: boolean = false;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthV1Service,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para alternar el valor de showPassword
  public togglePasswordVisibility(): void {
    console.log(this.showPassword);
    this.showPassword = !this.showPassword;
  }

  public navRegister(): void {
    event?.preventDefault();
    this.router.navigate(['/auth/register']);
  }

  public login(): void {
    console.log('Ruta absoluta:', this.router.url);
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      return;
    } else {
      this.errorMessage = '';
    }

    const userData: userLogin = this.loginForm.value;

    console.log(`email: ${userData.email}\npassword: ${userData.password}`);

    // animacion de carga en button
    this.loading = true;

    // enviar a servicio

    this.authService.login(userData).subscribe({
      next: (response: HttpResponse<LoginResponse>) => {
        if (response.body) {
          this.loading = false;
          console.log(response.body);
          const token = response.body.token;
          localStorage.setItem('token', token);

          const decodedToken = this.authService.decodeJwt(token);
          console.log(decodedToken);

          const email = decodedToken.username;

          const roles = JSON.parse(decodedToken.authorities);
          const role = roles[0].authority;
          localStorage.setItem('role', role);

          console.log('ROLE: ', role);
          this.dialogService.openLoadingWindow();
          this.authService
            .getUserData(email)
            .pipe(finalize(() => this.dialogService.closeDialog()))
            .subscribe({
              next: (res: HttpResponse<any>) => {
                console.log('response: ', res);
                console.log('response status:', res.status);
                if (res.status === 200) {
                  console.log(res);
                  if (role == 'ROLE_PATIENT') {
                    localStorage.setItem('name', res.body.patient.namePatient);
                  } else {
                    localStorage.setItem(
                      'name',
                      res.body.professional.nameProfessional
                    );
                  }

                  let data: DialogDataDto = this.loadSuccessResponse();
                  this.dialogService.openSuccessDialog(data).subscribe(() => {
                    this.navHome();
                  });
                }
              },
            });
          //}
          // guardar data del usuario en localStorage
          // navegar a la vista segun tipo de rol
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        console.log('error:', error);
        // dependiendo del error
        this.errorMessage = 'correo o contraseña incorrecta';
      },
    });
  }

  private loadSuccessResponse(): DialogDataDto {
    let dataSuccess: DialogDataDto = {
      tittle: '¡Bienvenido!',
      content: 'Inició sesión correctamente',
      actions: [
        {
          name: 'Ok',
          returnValue: true,
        },
      ],
    };
    return dataSuccess;
  }

  public navHome(): void {
    event?.preventDefault();
    this.router.navigate(['']);
  }
}
