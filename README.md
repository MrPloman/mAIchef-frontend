# 🍳 mAIchef

## 📖 What does it do?

mAIchef is an intelligent recipe handbook where users can request, customize, and save recipes. The application leverages AI to provide personalized cooking experiences with comprehensive recipe management features.

### ✨ Main Features

- **🔍 Recipe Requester**: Submit queries through an input field to receive 4-5 AI-generated recipe suggestions, each with a brief summary.
- **✏️ Recipe Modification**: Access any recipe and request the system to modify specific aspects or reimagine certain elements.
- **💾 Save Recipes**: Store your favorite recipes in a personal collection for future reference.
- **🛒 Shopping List Generator**: Automatically extract ingredients from recipes to create shopping lists that are saved for later use.
- **⏱️ Recipe Execution Mode**: Execute recipes step-by-step with built-in timers. The system automatically checks off completed tasks when timers expire. Includes pause, resume, and reset functionality for both individual steps and the entire recipe process.
- **🔧 Smart Utilities**: Convert measurement units (Celsius to Fahrenheit, etc.) and automatically adjust recipes for different serving sizes.

---

## 🏗️ Domains

### 1) Recipe Search and Management

---

## 📋 Use Cases

### `RequestRecipes`: Recipe Request via Prompt

**Actor**: `User`

**Description**: Enables recipe discovery through user-generated prompts and filter selectors. Returns 4 suggested recipes displayed in a list format.

#### Inputs

- **prompt**: `string` - User-defined text input describing desired recipe characteristics.
- **options**: `object` (optional)
  - `quantityPeople`: `number` - Number of servings
  - `meal`: `MealType[]` - Meal type (breakfast, lunch, dinner, etc.)
  - `cuisine`: `CuisineType[]` - Cuisine style (Mexican, Italian, etc.)
  - `restrictions`: `RestrictionsType[]` - Dietary restrictions
  - `duration`: `number` - Maximum preparation time

#### Output

List of 4 recipes (`requestedRecipe`) containing:

- `_id`: `string` - Unique identifier
- `title`: `string` - Recipe title
- `shortDescription`: `string` - Brief recipe description
- `difficulty`: `Difficulty` - Difficulty level (3 possible values)
- `estimatedTimeInMinutes`: `number` - Estimated execution time
- `servings`: `number` - Number of servings
- `ingredientsSummary`: `Ingredient[]` - Array of ingredients
- `createdAt`: `Date` - Recipe creation timestamp in the UI

#### Business Rules

- ❌ Empty prompts cannot be submitted
- ✅ Prompts can be submitted without selecting any options (options are optional)
- ✅ Nonsensical prompts with valid options will return a list of 4 `requestedRecipe` items
- ✅ Meaningful prompts will return a list of 4 `requestedRecipe` items
- ⚠️ Listed recipes are **temporary** and not persisted unless explicitly saved by the user (see `SaveUserRecipe`)

#### Error Handling

- ❌ Nonsensical prompts without valid options will return an error message and an empty `requestedRecipe` array
- ❌ API failures will display an error message to the user

---

### `SaveUserRecipe`: Save Recipe to Personal Collection

**Description**: Select and save one of the requested recipes to your personal recipe list.

---

### `RemoveUserRecipe`: Remove Recipe from Personal Collection

**Description**: Delete a saved recipe from your personal recipe list.

---

### `ListUserRecipes`: Display Personal Recipe Collection

**Description**: View all recipes saved in your personal collection.

---

### `GetRecipeDetail`: View Recipe Details

**Description**: Click on any recipe to view complete details including all preparation steps and instructions.

---

### `ReplanRecipe`: Modify Saved Recipes

**Description**: Request changes or modifications to a saved recipe. The system will regenerate the recipe with the requested alterations.

**Note**: This feature is only available for recipes that have been saved to your personal collection.

---

## 🚀 Getting Started

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## 🛠️ Technologies

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## 📝 License

# MAIchefFrontend
