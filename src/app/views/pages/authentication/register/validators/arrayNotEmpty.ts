import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ArrayEmpty (control: AbstractControl): ValidationErrors | null {
    const value = control.value as [];

    if (value.length === 0) {
        return {arrayEmpty:true}
    }

    return null;
}