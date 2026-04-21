import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestrictionTypeEnum } from '../../../core/domain/enums/restriction-type.enum';
import { LoaderFacade } from '../../../store/facades/loader.facade';
@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  recipeForm!: FormGroup;

  // Lista de opciones para las restricciones
  private restrictions = RestrictionTypeEnum;
  public restrictionOptions = Object.keys(this.restrictions).map((key) => ({
    name: key, // "Active"
    value: this.restrictions[key as keyof typeof this.restrictions], // "ACT"
  }));
  selectedRestrictions: any;
  public isDropdownOpen = false; // Flag to track state

  constructor(
    private fb: FormBuilder,
    private loaderFacade: LoaderFacade,
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipePrompt: ['', Validators.required],
      servings: [null, [Validators.min(1), Validators.required]],
      maxDuration: [null],
      mealType: [''],
      cuisineType: [''],
      restrictions: this.fb.array([]), // FormArray para los checkboxes
    });
  }

  // Getter para facilitar el acceso al FormArray en el HTML
  get restrictionsArray() {
    return this.recipeForm.get('restrictions') as FormArray;
  }

  onCheckboxChange(event: any, value: string) {
    if (event.target.checked) {
      this.selectedRestrictions.push(value);
    } else {
      this.selectedRestrictions = this.selectedRestrictions.filter(
        (r: any) => r !== value,
      );
    }

    // Update your form control
    this.recipeForm.get('restrictions')?.setValue(this.selectedRestrictions);
  }

  onGenerate() {
    if (this.recipeForm.invalid) return;
    const requestData = this.parseForm(this.recipeForm);
    // Aquí llamarías a tu servicio getReceipe()
    this.loaderFacade.set();
    this.loaderFacade.show();
    setTimeout(() => {
      this.loaderFacade.hide();
      setTimeout(() => {
        this.loaderFacade.set();
      }, 750);
    }, 5000);
  }

  parseForm(recipeForm: FormGroup) {
    const formValue = recipeForm.value;
    return {
      prompt: formValue.recipePrompt,
      preferences: {
        servings: formValue.servings,
        maxDuration: formValue.maxDuration,
        mealType: formValue.mealType,
        cuisineType: formValue.cuisineType,
        restrictions: formValue.restrictions,
      },
    };
  }

  onReset() {
    this.recipeForm.reset({
      mealType: '',
      cuisineType: '',
    });
    this.restrictionsArray.clear();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Optional: Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.filter-bubble')) {
      this.isDropdownOpen = false;
    }
  }
}
