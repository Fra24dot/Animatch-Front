import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(form: any) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  
  
  return password === confirmPassword ? null : { passwordMismatch: true };
}