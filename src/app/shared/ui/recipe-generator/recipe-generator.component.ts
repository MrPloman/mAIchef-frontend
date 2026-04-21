import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  restrictionsList = [
    { name: 'Vegano', value: 'vegano' },
    { name: 'Sin Gluten', value: 'sin-gluten' },
    { name: 'Keto', value: 'keto' },
    { name: 'Sin Lactosa', value: 'sin-lactosa' },
  ];

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

  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.restrictionsArray.push(new FormControl(e.target.value));
    } else {
      const index = this.restrictionsArray.controls.findIndex(
        (x) => x.value === e.target.value,
      );
      this.restrictionsArray.removeAt(index);
    }
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
}
