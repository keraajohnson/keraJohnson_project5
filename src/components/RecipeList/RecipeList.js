import React from 'react';

const RecipeList = (props) => {
    if (props.userState === true) {
        console.log('user recipes')
        return (
            <section className="recipeList">
                <h2>Recipe List</h2>
                {props.userRecipes.map((item) => {
                    if (item) {
                        return (
                            <div>
                                <p key={item.key} onClick={() => { props.showFullRecipe(item.key) }}>{item.recipeName}</p>
                            </div>
                        )
                    }
                })}
            </section>
        )
    } else {
        console.log('guest recipes')
        return (
            <section className="recipeList">
                <h2>Recipe List</h2>
                {props.guestRecipes.map((item) => {
                    if (item) {
                        return (
                            <div>
                                <p key={item.key} onClick={() => { props.showFullRecipe(item.key) }}>{item.recipeName}</p>
                            </div>
                        )
                    }
                })}
            </section>
        )
    }
}

export default RecipeList;

// shift option f to align brackets
