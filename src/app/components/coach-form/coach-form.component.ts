import { CoachService } from './../../services/coach.service';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NG_VALIDATORS,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CoachFrom } from '../../models/model';
import { ButtonComponent } from '../button/button.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-coach-form',
  standalone: true,
  imports: [
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './coach-form.component.html',
  styleUrl: './coach-form.component.css',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CoachFormComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachFormComponent {
  fb = inject(FormBuilder);
  coachService = inject(CoachService);

  coachToSubmit = output<CoachFrom>();

  coaches = this.coachService.coaches;

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required], [this.fullNameValidator.bind(this)]],
    email: ['', [Validators.required], [this.emailValidator.bind(this)]],
    managerId: [<number | null>null, [Validators.required]],
  });

  get fullNameControl() {
    return this.form.controls.fullName;
  }

  generateEmailFromFullName(fullName: string): string {
    const email =
      fullName
        .trim()
        .split(/\s+/)
        .map((word) => word.toLowerCase())
        .join('.') + '@coaching.com';
    return email;
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const fullName = this.fullNameControl.value;
    const expectedEmail = this.generateEmailFromFullName(fullName);
    if (control.value !== expectedEmail) {
      return of({ invalidEmail: true });
    }
    return of(null);
  }

  fullNameValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value.trim();
    const existingName = this.coaches().map((c) => c.fullName);

    const charLengthPattern = /^.{3,64}$/;
    const capitalLetterPattern = /^[A-Z][a-z]*$/;
    const onlyLettersPattern = /^[A-Za-z\s]+$/;
    const wordCountPattern = /^(?:[A-Z][a-z]*\s?){1,4}$/;

    if (!value.match(onlyLettersPattern)) {
      return of({ onlyLetters: true });
    }
    const words = value.split(/\s+/);
    for (const word of words) {
      if (!word.match(capitalLetterPattern)) {
        return of({ capitalLetter: true });
      }
    }
    if (!value.match(charLengthPattern)) {
      return of({ length: true });
    }
    if (!value.match(wordCountPattern)) {
      return of({ wordCount: true });
    }

    //update this check
    if (existingName.includes(control.value)) {
      return of({ fullNameExists: true });
    }

    return of(null);
  }

  onSubmit() {
    this.form.updateValueAndValidity();

    if (this.form.valid) {
      const value = this.form.getRawValue();

      this.coachToSubmit.emit(value);
    }
  }

  getErrorMessage(control: string) {
    if (control === 'fullName') {
      if (this.fullNameControl.getError('length')) {
        return 'The length of full name should be between 3 and 64 characters.';
      }
      if (this.fullNameControl.getError('capitalLetter')) {
        return 'First letter of a word should be capital.';
      }
      if (this.fullNameControl.getError('onlyLetters')) {
        return 'Full name can only contain letters.';
      }
      if (this.fullNameControl.getError('fullNameExists')) {
        return 'Full name already exists.';
      }
    }
    if (control === 'email') {
      return `Email should be combined of full name and separated by dot and contain domain name @coaching.com
`;
    }
    return '';
  }
}
