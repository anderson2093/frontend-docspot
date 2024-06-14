import { Routes } from '@angular/router';
import { PatientHomeComponent } from './patient-home.component';
import { SearchProfesionalComponent } from 'src/app/views/pages/search-profesional/search-profesional.component';

export const PATIENT_HOME_ROUTES: Routes = [
    {
        path:'home',
        children:[
            {
                path: 'patient',
                component: PatientHomeComponent,
            },
            {
                path: 'search-professional',
                component: SearchProfesionalComponent,
            }
        ]
    }
]