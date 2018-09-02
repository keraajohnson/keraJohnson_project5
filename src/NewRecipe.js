import React, { Component } from 'react';

class NewRecipe extends Component {
    render() {
        return(
            <div className='wrapper'>
                <form action="">
                    <button className='newRecipeButton'>New Recipe</button>
                    <div className="recipeInput">
                        <label className="recipeName" htmlFor="recipeName" id="recipeName" >Recipe Name</label>
                        <input name="recipeName" className="recipeName" id="recipeName" type="text"/>
                        <label className="ingredients" id="ingredients" htmlFor="ingredients">Ingredients</label>
                        <input name="ingredients" className="ingredients" id="ingredients"  type="text"/>
                        <label htmlFor="directions" name="directions" className="directions">Directions</label>
                        <input className="directions" id="directions" type="text"/>
                    </div>
                    <button className="Add to favs">Add To Faves</button>
                    <button className="Add to Need to Try">Need to try</button>
                </form>
            </div>

        )
    }
}

export default NewRecipe
