initApp = () => {

    const selectCategories = document.querySelector('#categorias')

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
    
    getCategories()
}

document.addEventListener('DOMContentLoaded', initApp)