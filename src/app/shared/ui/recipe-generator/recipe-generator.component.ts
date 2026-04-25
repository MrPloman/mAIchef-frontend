import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CuisineTypeEnum } from '../../../core/domain/enums/cuisine-type.enum';
import { MealTypeEnum } from '../../../core/domain/enums/meal-type.enum';
import { RestrictionTypeEnum } from '../../../core/domain/enums/restriction-type.enum';
import { RecipesFacade } from '../../../store/facades/recipes.facade';
@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  recipeForm!: FormGroup;

  private mealTypes = MealTypeEnum;
  private mealTypesOptions = Object.keys(this.mealTypes).map((key) => ({
    name: key,
    value: this.mealTypes[key as keyof typeof this.mealTypes],
  }));
  public selectedMealTypes: string[] = [];
  public mealTypesDropdownOpen = false; // Flag to track state

  private cuisineTypes = CuisineTypeEnum; // Restrictions setup
  private cuisineTypesOptions = Object.keys(this.cuisineTypes).map((key) => ({
    name: key,
    value: this.cuisineTypes[key as keyof typeof this.cuisineTypes],
  }));
  public selectedCuisines: string[] = [];
  public cuisinesDropdownOpen = false; // Flag to track state

  private restrictions = RestrictionTypeEnum;
  private restrictionOptions = Object.keys(this.restrictions).map((key) => ({
    name: key,
    value: this.restrictions[key as keyof typeof this.restrictions],
  }));
  public selectedRestrictions: string[] = [];
  public isRestrictionsDropdownOpen = false; // Flag to track state

  constructor(
    private fb: FormBuilder,
    private recipesFacade: RecipesFacade,
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipePrompt: ['', Validators.required],
      servings: [
        null,
        [Validators.min(1), Validators.max(12), Validators.required],
      ],
      maxDuration: [
        null,
        [Validators.min(1), Validators.max(640), Validators.required],
      ],
      mealTypes: [this.fb.array([]), Validators.required],
      cuisineTypes: [this.fb.array([]), Validators.required],
      restrictions: [this.fb.array([])], // FormArray para los checkboxes
    });
  }

  get mealTypesList() {
    return this.mealTypesOptions;
  }

  get cuisineTypesList() {
    return this.cuisineTypesOptions;
  }

  get restrictionsList() {
    return this.restrictionOptions;
  }

  public onCheckboxChange(
    event: any,
    value: string,
    type: 'restrictions' | 'cuisineTypes' | 'mealTypes',
  ) {
    switch (type) {
      case 'restrictions':
        if (event.target.checked) {
          this.selectedRestrictions.push(value);
        } else {
          this.selectedRestrictions = this.selectedRestrictions.filter(
            (r: string) => r !== value,
          );
        }
        this.recipeForm.controls['restrictions'].setValue(
          this.selectedRestrictions,
        );

        break;
      case 'cuisineTypes':
        if (event.target.checked) {
          this.selectedCuisines.push(value);
        } else {
          this.selectedCuisines = this.selectedCuisines.filter(
            (c: string) => c !== value,
          );
        }
        this.recipeForm.controls['cuisineTypes'].setValue(
          this.selectedCuisines,
        );
        break;
      case 'mealTypes':
        // Handle meal types checkbox change
        break;

      default:
        break;
    }

    // Update your form control
  }

  public onGenerate() {
    if (this.recipeForm.invalid) return;
    const requestData = this.parseForm(this.recipeForm);
    this.recipesFacade.getRecipesRequested(
      requestData.prompt,
      requestData.preferences,
    );
  }

  private parseForm(recipeForm: FormGroup) {
    const formValue = recipeForm.value;
    return {
      prompt: formValue.recipePrompt,
      preferences: {
        servings: formValue.servings,
        maxDuration: formValue.maxDuration,
        mealTypes: formValue.mealTypes,
        cuisineTypes: formValue.cuisineTypes,
        restrictions: formValue.restrictions.value || [],
      },
    };
  }

  onReset() {
    this.recipeForm.reset({
      mealTypes: '',
      cuisineTypes: '',
      restrictions: [],
    });
    this.selectedRestrictions = [];
    this.selectedCuisines = [];
  }
  toggleRestrictionsDropdown() {
    const dropdown = document.getElementById('restrictionsDropdown');
    if (this.isRestrictionsDropdownOpen) {
      dropdown?.classList.add('hide');
      setTimeout(() => {
        dropdown?.classList.remove('show');
        this.isRestrictionsDropdownOpen = false;
      }, 300);
    } else {
      dropdown?.classList.remove('hide');
      dropdown?.classList.add('show');
      setTimeout(() => {
        this.isRestrictionsDropdownOpen = true;
      }, 300);
    }

    // if (this.isRestrictionsDropdownOpen) {
    //   const dropdown = document.getElementById('restrictionsDropdown');
    //   dropdown?.classList.add('hide');

    //   setTimeout(() => {
    //     this.isRestrictionsDropdownOpen = !this.isRestrictionsDropdownOpen;
    //     dropdown?.classList.remove('hide');
    //   }, 750);
    // } else {
    //   const dropdown = document.getElementById('restrictionsDropdown');
    //   dropdown?.classList.remove('hide');
    //     this.isRestrictionsDropdownOpen = !this.isRestrictionsDropdownOpen;

    //   setTimeout(() => {
    //     dropdown?.classList.remove('show');
    //   }, 750);
    // }
  }
  toggleCuisinesDropdown() {
    this.cuisinesDropdownOpen = !this.cuisinesDropdownOpen;
  }
  toggleMealTypesDropdown() {
    this.mealTypesDropdownOpen = !this.mealTypesDropdownOpen;
  }

  // Optional: Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeRestrictionsDropdown(event: Event) {
    const restrictionsDropdown = document.getElementById(
      'restrictionsDropdown',
    );
    if (
      !(event.target as HTMLElement).closest(
        '#multiSelectRestrictionsToggle',
      ) &&
      this.isRestrictionsDropdownOpen &&
      restrictionsDropdown?.classList.contains('show')
    ) {
      restrictionsDropdown?.classList.add('hide');

      setTimeout(() => {
        this.isRestrictionsDropdownOpen = false;
        restrictionsDropdown?.classList.remove('show');
      }, 750);
      console.log('Clicked outside restrictions dropdown');
    }
  }
}
