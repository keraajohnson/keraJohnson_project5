import React from 'react';

const RecipeList = (props) => {
    return (
        <section className="recipeList">
            <h2>Recipe List</h2>
            {props.recipes.map((item) => {
                if (item) {
                    return (
                        <div>
                            <p key={item.key} onClick={() => { props.showFullRecipe(item.key)}}>{item.recipeName}</p>
                        </div>
                    )
                }
            })}
        </section>
    )
}

export default RecipeList;

// shift option f to align brackets
