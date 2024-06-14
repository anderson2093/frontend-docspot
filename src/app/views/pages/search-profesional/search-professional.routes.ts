import { Routes } from '@angular/router';
import { SearchProfesionalComponent } from './search-profesional.component';
import { ShowScheduleComponent } from './components/show-schedule/show-schedule.component';


export const SEARCH_PROFESSIONAL_ROUTES: Routes = [
    {
        path: 'list',
        component: SearchProfesionalComponent,
    },
    {
        path: 'turno',
        component: ShowScheduleComponent,
    }
]
