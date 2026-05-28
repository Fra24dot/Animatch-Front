import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
 
export function emailValidators(): ValidatorFn{
    return (control : AbstractControl) : ValidationErrors | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
       if (!control.value) {
            return null;
       };
 
       
       if (!emailRegex.test(control.value)) {
            return {badEmail : "Pas bon le format"}
       }    
       return null
    }
}