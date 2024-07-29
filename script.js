const calendarIcon= document.getElementById('calendar');
const calendarModal = document.getElementById('calendarModal');
calendarIcon.addEventListener('click', () =>{
    flatpickr(calendarIcon).open();
})

let myRecipes= document.getElementById('my-recipe');
const yourRecipes= [];
let yourPlannedRecipes = document.getElementById('your-recipe');
let dateText= document.getElementById('date');

let searchBtn= document.getElementById('search');
searchBtn.addEventListener('click' , () =>{
    let searchText= document.getElementById('searchText');
    fetch (`https://forkify-api.herokuapp.com/api/search?q=${searchText.value.trim()}`)
    .then (response => response.json ()) 
    .then (data => {
        // console.log(data.recipes);
        renderRecipes(data.recipes)
    }).catch (error => {
      myRecipes.innerHTML = 
        `<h2>Error: ${error} </h2>`;
    });
   
    if(searchText === '' || dateText === '' ){
        alert ('Enter search details')
        return 
    };
    searchText.value= '';

})

function renderRecipes(recipes){
    myRecipes.innerHTML= '';
    for (let r=0; r<3; r++){
        const recipeTitle= recipes[r].title;
        const recipeUrl= recipes[r].source_url;
        const recipeImage= recipes[r].image_url;
        const recipeId= recipes[r].recipe_id;
        let recipeCard= document.createElement('div');
        recipeCard.classList.add('shadow-lg','border','p-6');
        recipeCard.innerHTML = `
        <h2> ${recipeTitle}</h2>
        <a href="${recipeUrl}">Link:</a>
        <img src="${recipeImage}">
        <button data-id="${recipeId}">Add recipe</button>
         `
        myRecipes.appendChild(recipeCard)
    }

   
   
       
}
function renderYourRecipes (){
    yourPlannedRecipes.innerHTML= '';
    yourRecipes.forEach( (recipe) =>{
        const yourRecipesCard = document.createElement('div');
        yourRecipesCard.innerHTML = `
         <img src="${recipe.image}">
         <h2> Title:${recipe.title}</h2>
         <h2> Date:${dateText.value}
        `
        yourPlannedRecipes.appendChild(yourRecipesCard)
    })

}

myRecipes.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'&& event.target.dataset.id){
        const recipeId= event.target.dataset.id;
        const recipeCard = event.target.closest('div');
        const recipeTitle= recipeCard.querySelector('h2').textContent;
        const recipeImage= recipeCard.querySelector('img').src;

        const plannedMeal = {
            id:recipeId,
            title:recipeTitle,
            image:recipeImage,
    }
    yourRecipes.push(plannedMeal)
    renderYourRecipes();

    }
})

// let numbers = [21,24,35,64]
// let theNumbers = numbers.map( (number) =>{
//     console.log(number);
// })

// let names= ["John","James","Jack"]

// names.map ( (thename) =>{
//     console.log(thename);
// })
// for (let i=0; i<5; i++)   {
//     console.log(names[i])

// }
//api,search,select recipe,adds to your recipes and calendar 