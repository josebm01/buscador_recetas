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
            
            recipeButton.onclick = function() {
                selectRecipe(idMeal)
            }


            // Inyectamos en el código HTML
            recipeCardBody.appendChild(recipeHeading)
            recipeCardBody.appendChild(recipeButton)

            recipeCard.appendChild(recipeImage)
            recipeCard.appendChild(recipeCardBody)

            recipeContainer.appendChild(recipeCard)
            result.appendChild(recipeContainer)
        })
    } 

    const selectRecipe = ( id ) => {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        
        fetch( url )
            .then( response => response.json())
            .then( result => showRecipeModal(result.meals[0]) )
    }

    const showRecipeModal = ( recipe ) => {
        
        const { idMeal, strInstructions, strMeal, strMealThumb } = recipe 

        // Añadir contenido al modal 
        const modalTitle = document.querySelector('.modal .modal-title')
        const modalBody = document.querySelector('.modal .modal-body')

        modalTitle.textContent = strMeal

        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class"my-3 mt-5">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="mt-3">Ingredientes y cantidades</h3>
        `

        const listGroup = document.createElement('UL')
        listGroup.classList.add('list-group')

        // Mostrar cantidades e ingredientes
        for (let i = 1; i < 20; i++) {
            if ( recipe[`strIngredient${i}`] ){
                const ingredient = recipe[`strIngredient${i}`]
                const measure = recipe[`strMeasure${i}`]

                // Lista de ingredientes
                const ingredientList = document.createElement('LI')
                ingredientList.classList.add('list-group-item')
                ingredientList.textContent = `#${i}: ${ingredient} - ${measure}`
                
                // Agreamos a la lista
                listGroup.appendChild(ingredientList)
            }            
        }

        modalBody.appendChild(listGroup)

        const modalFooter = document.querySelector('.modal-footer')
        cleanHTML(modalFooter)

        // Botones de cerrar y favorito
        const btnFavorite = document.createElement('BUTTON')
        btnFavorite.classList.add('btn', 'btn-danger', 'col')
        btnFavorite.textContent = 'Guardar favorito'
        
        const btnCloseModal = document.createElement('BUTTON')
        btnCloseModal.classList.add('btn', 'btn-secondary', 'col')
        btnCloseModal.textContent = 'Cerrar'
        // Cerrar modal con la instancia
        btnCloseModal.onclick = function() {
            modal.hide()
        }

        modalFooter.appendChild(btnFavorite)
        modalFooter.appendChild(btnCloseModal)

        // muestra el modal 
        modal.show()
    }

    const cleanHTML = ( select ) => {
        while( select.firstChild ) {
            select.removeChild(select.firstChild)
        }
    }

    const selectCategories = document.querySelector('#categorias')
    selectCategories.addEventListener('change', selectCategory)

    const result = document.querySelector('#resultado')
    // Creación del modal
    const modal = new bootstrap.Modal('#modal', {})



    getCategories()
}

document.addEventListener('DOMContentLoaded', initApp)