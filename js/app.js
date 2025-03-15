initApp = () => {

    let getCategories = () => {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php'
        fetch(url)
            .then( response => response.json())
            .then( result => showCategories(result.categories))
    }

    let showCategories = ( categories = [] ) => {
        console.log(categories)
    }

    getCategories()
}

document.addEventListener('DOMContentLoaded', initApp)