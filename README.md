# 🍳 mAIchef

## 📖 What does it do?

mAIchef is an intelligent recipe handbook where users can request, customize, and save recipes. The application leverages AI to provide personalized cooking experiences with comprehensive recipe management features.

## ✨ Main Features

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

### 📋 Use Cases

### 1. 🔍 `RequestRecipes` - Search for Recipes with a Prompt

Request recipes using a brief description. The system returns 4 suggested recipes.

**👤 Actor:** `User`

**📝 Description:** Resolves recipe retrieval through a user-created prompt and selectors. Returns 4 options displayed in a list.

**📥 Inputs:**

- `prompt` (string): Information defined by the user through an InputText
- `options` (optional):
  - `quantityPeople` (number): Number of servings
  - `meal` (MealType[]): Type of meal (dinner, lunch, etc.)
  - `cuisine` (CuisineType[]): Cuisine style (Mexican, Italian, etc.)
  - `restrictions` (RestrictionsType[]): Dietary restrictions
  - `duration` (number): Preparation time

**📤 Output:**

List of 4 recipes (`requestedRecipe`) with the following information:

- `_id` (string): Identifier
- `title` (string): Recipe title
- `shortDescription` (string): Brief recipe description
- `difficulty` (Difficulty): Difficulty level (three types)
- `estimatedTimeInMinutes` (number): Estimated preparation time
- `servings` (number): Number of servings
- `ingredientsSummary` (Ingredient[]): Array of ingredients
- `createdAt` (Date): Recipe creation moment in the UI

**✅ Rules:**

- Prompt cannot be empty
- Prompt can be sent without selecting any options (options are optional)
- If a meaningless prompt is sent with well-selected options, it will return a list of four `requestedRecipe`
- A meaningful prompt will return a list of four `requestedRecipe`
- Listed recipes are temporary and not saved anywhere. They only become permanent if the user saves them (another use case)

**❌ Errors:**

- Meaningless prompt without options returns an error message and empty `requestedRecipe` array
- Failed response shows an error message

---

### 2. 💾 `SaveUserRecipe` - Save Recipe to My List

Select one of the obtained recipes and save it.

**👤 Actor:** `Authenticated User` and `Recipe`

**📝 Description:** Resolves saving of obtained recipes. When selected, it becomes persistent and is no longer temporary, allowing it to be modified or executed later.

**📥 Inputs:**

- `userId` (string): ID of the user saving the recipe
- `recipeData` (recipe): Complete recipe data

**📤 Output:**

The persisted recipe - server only returns acknowledgment message. Backend creates the link and the recipe with all information is saved in the user's store.

**✅ Rules:**

- Only authenticated users can execute this use case
- Recipe must exist
- If user already has an identical recipe, it cannot be added and a warning message appears
- When saving the recipe:
  - `userId` is assigned
  - `version = 1` is set
  - Persistent `_id` is generated
  - `createdAt` is fixed
- A saved recipe can now be:
  - Executed
  - Replanned
  - Exported

**❌ Errors:**

- Meaningless prompt without options returns an error message and empty `requestedRecipe` array
- Failed response shows an error message

---

### 3. 🗑️ `RemoveUserRecipe` - Remove Recipe from My List

**👤 Actor:** `Authenticated User` and `Recipe`

**📝 Description:** Removes a previously saved recipe. When re-selected (once already selected), the link between user and recipe is deleted.

**📥 Inputs:**

- `userId` (string): ID of the user removing the recipe
- `recipeId` (string): Recipe ID

**📤 Output:**

Persisted recipe - server only returns acknowledgment message. Backend unlinks and the recipe with all information is removed from the frontend store.

**✅ Rules:**

- Only authenticated users can execute this use case
- Recipe must exist and be linked to the user
- When removing the recipe link:
  - Recipe remains saved but its link to the user disappears
  - User no longer sees it in their list

**❌ Errors:**

- Recipe not found error
- Link verification error
- Failed deletion response shows error message

---

### 4. 📖 `ListUserRecipes` - List My Saved Recipes

**👤 Actor:** `Authenticated User`

**📝 Description:** Resolves retrieval of all persisted recipes associated with an authenticated user. Returns complete list of saved recipes, including structural information (title, ingredients, steps, metadata, etc.). This use case does not modify state, only queries the `UserRecipeList` aggregate and returns its recipes.

**📥 Inputs:**

- `userId` (string): User ID requesting the recipe list

**📤 Output:**

- `recipes` (Recipe[]): Array of persisted recipes associated with the user. Returns empty array if user has no saved recipes.

**✅ Rules:**

- Only authenticated users can execute this use case
- `userId` must exist in the system
- If user doesn't have a created list yet:
  - Returns empty array
- No data is modified
- No version recalculations
- No OpenAI queries
- No execution state alterations

**❌ Errors:**

- Recipe not found error
- Link verification error
- Failed deletion response shows error message

---

### 5. 📄 `GetRecipeDetail` - View Recipe Details and Explanation

Click on recipe to display all steps.

**👤 Actor:** `Authenticated User`

**📝 Description:** Resolves retrieval of complete detail of a recipe previously saved by the user. Returns all structural information necessary to:

- Display ingredients
- Display steps
- Show estimated duration
- Show metadata (version, createdAt, etc.)
- Enable later execution, replanning, or export

**📥 Inputs:**

- `userId` (string): Authenticated user identifier
- `recipeId` (string): Unique identifier of persisted recipe

**📤 Output:**

- `recipe` (Recipe): Returns all recipe data

**✅ Rules:**

- Only authenticated users can execute this use case
- `userId` must exist in the system
- If user doesn't have a created list yet:
  - Returns empty array
- No data is modified
- No version recalculations
- No OpenAI queries
- No execution state alterations

**❌ Errors:**

- Recipe not found error
- Link verification error
- Failed deletion response shows error message

---

### 6. 🔄 `ReplanRecipe` - Request Changes to Saved Recipe and Generate New Modified Version

**👤 Actor:** `Authenticated User`

**📝 Description:** Resolves modification of a recipe previously saved by the user. From a persisted recipe and new instructions or preferences, the system generates a new recipe version.

The original recipe is not deleted or overwritten, but a new persisted version is created, incrementing its version number and maintaining reference to the previous recipe.

**📥 Inputs:**

- `userId` (string): ID of authenticated user wanting to modify the recipe
- `recipeId` (string): ID of recipe to be replanned
- `replanRequest` (RecipeRequest): New structured information that may include:
  - `prompt`
  - `preferences` (servings, mealTypes, cuisineTypes, restrictions, duration)

**📤 Output:**

Server returns the new versioned recipe already persisted.

- `recipe` (Recipe):
  - New generated `_id`
  - Incremented `version` (`version = previous + 1`)
  - `parentRecipeId` or reference to previous version
  - Updated `createdAt`
  - All structural data of the new recipe

**✅ Rules:**

- Only authenticated users can execute this use case
- Recipe must exist
- Recipe must belong to user (`recipe.userId === userId`)
- Only persisted recipes can be replanned
- Original recipe is not overwritten
- New persistent `_id` must be generated
- Version must be incremented automatically
- `createdAt` must be set for new version
- New recipe is immediately available to:
  - Execute
  - Replan again
  - Export
- Operation may involve a call to the planning service (AI), but domain doesn't directly depend on its implementation

**❌ Errors:**

- User not authenticated → authorization error
- Recipe doesn't exist → `RecipeNotFound` error
- Recipe doesn't belong to user → `Forbidden` error
- Invalid `replanRequest` → validation error
- Generation service failure → planning error message
- Persistence failure → storage error message

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
