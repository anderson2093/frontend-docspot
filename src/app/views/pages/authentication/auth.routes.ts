import { LoginComponent } from "./login/login.component";
import { Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { PrincipalPageComponent } from "./principal-page/principal-page.component";

export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
]