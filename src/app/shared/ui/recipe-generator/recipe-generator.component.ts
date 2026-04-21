import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoaderFacade } from '../../../store/facades/loader.facade';
@Component({
  selector: 'app-recipe-generator',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-generator.component.html',
  styleUrl: './recipe-generator.component.scss',
})
export class RecipeGeneratorComponent {
  // constructor() {}
  // public getReceipe() {

  // }
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
      recipePrompt: [''],
      servings: [null],
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
    console.log('Datos del formulario:', this.recipeForm.value);
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

  onReset() {
    this.recipeForm.reset({
      mealType: '',
      cuisineType: '',
    });
    this.restrictionsArray.clear();
  }
}
