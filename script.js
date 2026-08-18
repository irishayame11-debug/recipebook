// ================= RECIPE DATA =================

const recipes = [

    {
        id: 1,
        name: "Shakshuka",
        meal: "Breakfast",
        ingredient: "Egg",
        icon: "flame",
        time: 30,
        servings: 4,

        ingredients: [
            ["Eggs", "6x"],
            ["Canned tomatoes", "1x"],
            ["Red bell pepper", "1x"],
            ["Onion", "1x"],
            ["Garlic", "3 cloves"],
            ["Feta cheese", "1/4 cup"]
        ],

        steps: [
            "Cook the onion and pepper in a pan.",
            "Add garlic and tomatoes.",
            "Crack the eggs into the sauce.",
            "Cover and cook until the eggs are ready.",
            "Add feta cheese and serve."
        ]
    },


    {
        id: 2,
        name: "Avocado Toast with Egg",
        meal: "Breakfast",
        ingredient: "Egg",
        icon: "egg",
        time: 10,
        servings: 2,

        ingredients: [
            ["Sourdough bread", "2 slices"],
            ["Avocado", "1x"],
            ["Egg", "2x"],
            ["Lemon", "1/2"],
            ["Chili flakes", "pinch"]
        ],

        steps: [
            "Toast the bread.",
            "Mash the avocado with lemon juice.",
            "Cook the eggs.",
            "Put the avocado and egg on the toast."
        ]
    },


    {
        id: 3,
        name: "Banana Oat Pancakes",
        meal: "Breakfast",
        ingredient: "Vegetable",
        icon: "grain",
        time: 20,
        servings: 4,

        ingredients: [
            ["Rolled oats", "2 cups"],
            ["Bananas", "2x"],
            ["Eggs", "2x"],
            ["Milk", "1/2 cup"],
            ["Maple syrup", "2 tbsp"]
        ],

        steps: [
            "Blend the oats.",
            "Add bananas, eggs and milk.",
            "Cook the pancakes in a pan.",
            "Serve with maple syrup."
        ]
    },


    {
        id: 4,
        name: "Classic Caesar Salad",
        meal: "Lunch",
        ingredient: "Fish & Seafood",
        icon: "leaf",
        time: 20,
        servings: 4,

        ingredients: [
            ["Romaine lettuce", "2 heads"],
            ["Parmesan", "1/2 cup"],
            ["Croutons", "1 cup"],
            ["Anchovy", "4x"],
            ["Lemon", "1x"]
        ],

        steps: [
            "Prepare the Caesar dressing.",
            "Chop the lettuce.",
            "Mix lettuce with dressing.",
            "Add croutons and parmesan."
        ]
    },


    {
        id: 5,
        name: "Miso Soup with Tofu",
        meal: "Lunch",
        ingredient: "Vegetable",
        icon: "bowl",
        time: 15,
        servings: 4,

        ingredients: [
            ["Miso paste", "1/3 cup"],
            ["Tofu", "1 block"],
            ["Scallions", "2x"],
            ["Seaweed", "2 tbsp"]
        ],

        steps: [
            "Prepare the soup stock.",
            "Add miso paste.",
            "Add tofu and seaweed.",
            "Serve with scallions."
        ]
    },


    {
        id: 6,
        name: "Pasta Aglio e Olio",
        meal: "Dinner",
        ingredient: "Vegetable",
        icon: "flame",
        time: 20,
        servings: 4,

        ingredients: [
            ["Spaghetti", "1 lb"],
            ["Garlic", "6 cloves"],
            ["Olive oil", "1/3 cup"],
            ["Parsley", "1 bunch"],
            ["Parmesan", "1/4 cup"]
        ],

        steps: [
            "Cook the spaghetti.",
            "Cook garlic in olive oil.",
            "Add the cooked pasta.",
            "Add parsley and parmesan."
        ]
    },


    {
        id: 7,
        name: "Chicken Tikka Masala",
        meal: "Dinner",
        ingredient: "Chicken",
        icon: "flame",
        time: 45,
        servings: 4,

        ingredients: [
            ["Chicken thighs", "1.5 lb"],
            ["Yogurt", "1/2 cup"],
            ["Tomatoes", "1 can"],
            ["Cream", "1/2 cup"],
            ["Onion", "1x"],
            ["Rice", "2 cups"]
        ],

        steps: [
            "Marinate the chicken.",
            "Cook the chicken.",
            "Cook the onion and spices.",
            "Add tomatoes and cream.",
            "Add the chicken and serve with rice."
        ]
    },


    {
        id: 8,
        name: "Garlic Butter Shrimp Pasta",
        meal: "Dinner",
        ingredient: "Fish & Seafood",
        icon: "shrimp",
        time: 25,
        servings: 4,

        ingredients: [
            ["Shrimp", "1 lb"],
            ["Linguine", "1 lb"],
            ["Butter", "4 tbsp"],
            ["Garlic", "5 cloves"],
            ["Lemon", "1x"]
        ],

        steps: [
            "Cook the pasta.",
            "Cook shrimp in butter.",
            "Add garlic and lemon.",
            "Mix everything together."
        ]
    }

];


// ================= SETTINGS =================

let selectedMeal = "All";
let selectedIngredient = "All";
let searchText = "";

let currentPage = 1;
const recipesPerPage = 9;

// ================= DISPLAY RECIPES =================

function displayRecipes(recipeList) {

    const grid = document.getElementById("recipeGrid");

    grid.innerHTML = "";

    const start = (currentPage - 1) * recipesPerPage;
    const end = start + recipesPerPage;

    const visibleRecipes = recipeList.slice(start, end);

    if (visibleRecipes.length === 0) {

        grid.innerHTML = `<p>No recipes found.</p>`;

        return;
    }

    visibleRecipes.forEach(recipe => {

        grid.innerHTML += `

            <div class="card">

                <div class="card-top">
                    <div class="card-icon">
                        <svg>
                            <use href="#${recipe.icon}"></use>
                        </svg>
                    </div>
                </div>

                <div class="card-body">

                    <div class="category">
                        ${recipe.meal} · ${recipe.ingredient}
                    </div>

                    <h3>${recipe.name}</h3>

                    <div class="card-info">

                        <span>
                            <svg>
                                <use href="#clock"></use>
                            </svg>
                            ${recipe.time} min
                        </span>

                        <span>
                            <svg>
                                <use href="#users"></use>
                            </svg>
                            Serves ${recipe.servings}
                        </span>

                    </div>

                    <button
                        class="card-button"
                        onclick="showRecipe(${recipe.id})">
                        View Recipe
                    </button>

                </div>

            </div>

        `;
    });

    updateNavigation(recipeList);
}

// ================= UPDATE NAVIGATION =================

function updateNavigation(recipeList) {

    const totalPages =
        Math.ceil(recipeList.length / recipesPerPage);

    document.getElementById("recipePage").textContent =
        currentPage;

    document.getElementById("prevRecipe").disabled =
        currentPage === 1;

    document.getElementById("nextRecipe").disabled =
        currentPage === totalPages;
}

// ================= FILTER RECIPES =================

function filterRecipes() {

    const filtered = recipes.filter(recipe => {

        // Check meal
        const mealMatch =
            selectedMeal === "All" ||
            recipe.meal === selectedMeal;


        // Check main ingredient
        const ingredientMatch =
            selectedIngredient === "All" ||
            recipe.ingredient === selectedIngredient;


        // Check search
        const searchMatch =
            searchText === "" ||

            recipe.name
                .toLowerCase()
                .includes(searchText) ||

            recipe.meal
                .toLowerCase()
                .includes(searchText) ||

            recipe.ingredient
                .toLowerCase()
                .includes(searchText) ||

            recipe.ingredients.some(item =>
                item[0]
                    .toLowerCase()
                    .includes(searchText)
            );


        return (
            mealMatch &&
            ingredientMatch &&
            searchMatch
        );

    });


    displayRecipes(filtered);
}

// ================= RECIPE NAVIGATION =================

document
    .getElementById("prevRecipe")
    .addEventListener("click", function() {

        if (currentPage > 1) {

            currentPage--;

            filterRecipes();

        }

    });


document
    .getElementById("nextRecipe")
    .addEventListener("click", function() {

        const filtered = recipes.filter(recipe => {

            const mealMatch =
                selectedMeal === "All" ||
                recipe.meal === selectedMeal;

            const ingredientMatch =
                selectedIngredient === "All" ||
                recipe.ingredient === selectedIngredient;

            const searchMatch =
                recipe.name
                    .toLowerCase()
                    .includes(searchText);

            return (
                mealMatch &&
                ingredientMatch &&
                searchMatch
            );

        });

        const totalPages =
            Math.ceil(filtered.length / recipesPerPage);

        if (currentPage < totalPages) {

            currentPage++;

            displayRecipes(filtered);

        }

    });

// ================= SEARCH =================

document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        searchText = this.value.toLowerCase().trim();

        currentPage = 1;

        filterRecipes();

    });


// ================= INGREDIENT FILTER =================

document
    .getElementById("ingredientSelect")
    .addEventListener("change", function() {

        selectedIngredient = this.value;

        currentPage = 1;

        filterRecipes();

    });

// ================= MEAL FILTER =================

const mealButtons =
    document.querySelectorAll(".chip");


mealButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active from all buttons
        mealButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Add active to clicked button
        this.classList.add("active");


        // Get selected meal
        selectedMeal =
            this.dataset.meal;

        currentPage = 1;
        
        // Update recipes
        filterRecipes();

    });

});


// ================= SHOW RECIPE =================

function showRecipe(id) {

    const recipe =
        recipes.find(recipe => recipe.id === id);

    const overlay =
        document.getElementById("recipeOverlay");

    // Category
    document.getElementById("detailCategory").textContent =
        `${recipe.meal} · ${recipe.ingredient}`;

    // Title
    document.getElementById("detailTitle").textContent =
        recipe.name;

    // Time
    document.getElementById("detailTime").textContent =
        recipe.time;

    // Servings
    document.getElementById("detailServings").textContent =
        recipe.servings;


    // ================= INGREDIENTS =================

    const ingredientContainer =
        document.getElementById("detailIngredients");

    ingredientContainer.innerHTML = "";

    recipe.ingredients.forEach(item => {

        ingredientContainer.innerHTML += `

            <div class="ingredient">

                <span>${item[1]}</span>

                <span>${item[0]}</span>

            </div>

        `;

    });


    // ================= INSTRUCTIONS =================

    const stepsContainer =
        document.getElementById("detailSteps");

    stepsContainer.innerHTML = "";

    recipe.steps.forEach(step => {

        stepsContainer.innerHTML += `
            <li>${step}</li>
        `;

    });


    // ================= OPEN =================

    overlay.classList.add("show");

}


// ================= CLOSE OVERLAY =================

document
    .getElementById("closeOverlay")
    .addEventListener("click", function() {

        document
            .getElementById("recipeOverlay")
            .classList.remove("show");

    });


// Close when clicking dark background

document
    .getElementById("overlayBackdrop")
    .addEventListener("click", function() {

        document
            .getElementById("recipeOverlay")
            .classList.remove("show");

    });

// ================= START WEBSITE =================

displayRecipes(recipes);