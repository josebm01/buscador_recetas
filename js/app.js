initApp = () => {

    let getCategories = () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then( response => response.json())
            .then( result => showCategories(result.categories))
    }

    let showCategories = ( categories = [] ) => {
        categories.forEach( category => {

            const { strCategory } =  category

            const option = document.createElement('OPTION')
            option.value = strCategory
            option.textContent = strCategory

            selectCategories.appendChild(option)
        })
    }

    let selectCategory = (e) => {
        const category = e.target.value 
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        
        fetch( url )
            .then(response => response.json())
            .then(result => showRecipes(result.meals) )
    }

    const showRecipes = ( recipes = []) => {

        // Limpiamos en HTML
        cleanHTML(result)

        const heading = document.createElement('H2')
        heading.classList.add('text-center', 'text-black', 'my-5')
        heading.textContent = recipes.length ? 'Resultados' : 'No hay resultados'
        result.appendChild(heading)

        // iterando las recetas
        recipes.forEach( recipe => {
            
            const { idMeal, strMeal, strMealThumb } = recipe

            // Card
            const recipeContainer = document.createElement('DIV')
            recipeContainer.classList.add('col-md-4')

            const recipeCard = document.createElement('DIV')
            recipeCard.classList.add('card', 'mb-4')

            const recipeImage = document.createElement('IMG')
            recipeImage.classList.add('card-img-top')
            recipeImage.alt = `Imagen de la receta ${strMeal}`
            recipeImage.src = strMealThumb

            const recipeCardBody = document.createElement('DIV')
            recipeCardBody.classList.add('card-body')

            const recipeHeading = document.createElement('H3')
            recipeHeading.classList.add('card-title', 'mb-3')
            recipeHeading.textContent = strMeal

            const recipeButton = document.createElement('BUTTON')
            recipeButton.classList.add('btn', 'btn-danger', 'w-100')
            recipeButton.textContent = 'Ver receta'


            // Inyectamos en el código HTML
            recipeCardBody.appendChild(recipeHeading)
            recipeCardBody.appendChild(recipeButton)

            recipeCard.appendChild(recipeImage)
            recipeCard.appendChild(recipeCardBody)

            recipeContainer.appendChild(recipeCard)
            result.appendChild(recipeContainer)
        })
    } 

    const cleanHTML = ( select ) => {
        while( select.firstChild ) {
            select.removeChild(select.firstChild)
        }
    }

    const selectCategories = document.querySelector('#categorias')
    selectCategories.addEventListener('change', selectCategory)

    const result = document.querySelector('#resultado')



    getCategories()
}

document.addEventListener('DOMContentLoaded', initApp)