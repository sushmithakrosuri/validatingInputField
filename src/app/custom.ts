import { AbstractControl,ValidatorFn } from "@angular/forms";
import { FormControl } from "@angular/forms";


export function customValidator(): ValidatorFn {
    return (control: AbstractControl):  { [key: string]: {message: string} } | null =>  {
  
      if (new RegExp(/^[^0-9]*$/).test(control.value)) {
        return {
          pattern1Error: {
            message: `Numbers not allowed`
          }
        };
      } 
  
      if (new RegExp(/^[^A-Z]*$/).test(control.value)) {
        return {
          pattern2Error: {
            message: `Capital letters not allowed`
          }
        };
      } 
       
     return null;
    };
  }

 /* export class CustomValidators {
    nameValidator(control: FormControl): { [key: string]: boolean } {
        const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (control.value && nameRegexp.test(control.value)) {
           return { invalidName: true };
        }
    }
}*/