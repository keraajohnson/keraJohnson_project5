import React from 'react';

const RecipeCard = (props) => {
    return (
        <section className="recipeCard">
            <div className="newButton clearfix">
                <button onClick={() => props.exitFullRecipe()} className='newRecipeButton'>Exit Recipe</button>
            </div>
            <div className="newCard">
                <div className="recipeName">
                    <h2>Recipe Name</h2>
                    <p>{props.recipeName}</p>
                </div>
                <div className="ingredients">
                    <div className="ingredientsHeading">
                        <h2>Ingredients</h2>
                    </div>
                    <div className="ingredientsList">
                        {props.ingredients ? props.ingredients.map((item) => {
                           return (
                                <li>{item}</li>
                            )
                        }) : ''}
                    </div>
                </div>
                <div className="directions">
                    <div className="directionsHeading">
                        <h2>Directions</h2>
                    </div>
                    <div className="directionsList">
                        {props.directions ? props.directions.map((item) => {
                            return (
                                <li>{item}</li>
                            )
                        }): ''}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RecipeCard