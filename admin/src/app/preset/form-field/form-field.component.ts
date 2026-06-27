import { Component, Input, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true,
    },
  ],
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'password' | 'email' = 'text';
  @Input() autocomplete = 'off';
  @Input() invalid = false;

  protected value = signal('');
  protected showPassword = signal(false);
  protected disabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected get resolvedType(): string {
    if (this.type !== 'password') return this.type;
    return this.showPassword() ? 'text' : 'password';
  }

  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  protected handleBlur(): void {
    this.onTouched();
  }

  // --- ControlValueAccessor interface ---
  // These four methods are how Angular's forms API talks to this component.
  // Angular calls writeValue() to push a value in (e.g. form.reset()),
  // and calls registerOnChange/registerOnTouched to give us callbacks
  // we invoke whenever the user types or blurs the field.

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
