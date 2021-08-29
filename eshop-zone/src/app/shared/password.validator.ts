import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confimPassword = control.get('confimPassword');
    return password && confimPassword && password.value !== confimPassword.value ? { passwordMissMatch: true } : null;
};