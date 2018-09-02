import React from 'react';

const RecipeList = (props) => { 
   return(
        <section className="recipeList">
            <h2>Recipe List</h2>
            {props.recipes.map((item) => {
                return (
                    <div key={item.key}>
                        <p onClick={() => {props.showFullRecipe(item.key)}}>{item.recipeName}</p>
                    </div>
                    )
                })}
        </section>
    )
}

export default RecipeList;
