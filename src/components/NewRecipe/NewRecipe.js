
import React, { Component } from 'react';

class NewRecipe extends Component {
    constructor() {
        super();
        this.state = {
            recipeName: '',
            recipeIngredients: [],
            currentIngredient: '',
            recipeDirections: [],
            currentDirection: '',
            ingredientsListUnsubmitted: '',
            directionsListUnsubmitted: ''
        }
    }
    handleChange = (e) => {
        // make sure this is updating currentIng 
        this.setState({
            [e.target.id] : e.target.value
        });
    }
    // resets the form on the click of "new recipe"
    handleClick = () => {
        this.setState({
            recipeName: '',
            recipeIngredients: [],
            recipeDirections: []
        })
    }
    addNewIngredient = (e) => {
        e.preventDefault()
        console.log('adding new ingre')
        const ingredients = Array.from(this.state.recipeIngredients);
        ingredients.push(this.state.currentIngredient);
        this.setState({
            recipeIngredients: ingredients,
            currentIngredient: '',
            currentDirections: ''
        });
    }
    addNewDirection = (e) => {
        e.preventDefault()
        const directions = Array.from(this.state.recipeDirections);
        directions.push(this.state.currentDirections);
        this.setState({
            recipeDirections: directions,
            currentIngredient: '',
            currentDirections: ''
        })
    }    
    // handles the submit of the form
    // calls addRecipeToDataBase
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecipeToDatabase(this.state.recipeName, this.state.recipeIngredients, this.state.recipeDirections);
        this.setState({
            recipeName: '',
            currentIngredient: '',
            currentDirections: '',
            ingredientsListUnsubmitted: '',
            directionsListUnsubmitted: '',
        });
    }
    render() {
        return(
            <section className="newRecipeSection">
                <div className="newButton clearfix">
                    <button onClick={this.handleClick} className='newRecipeButton'>New <i class="fas fa-plus"></i></button>
                </div>
                <div className='recipeCardInput'>
                    <form onSubmit={this.handleSubmit}>
                        <div className="recipeInput">
                            <div className="recipeNameContainer container">
                                <label className="recipeNameLabel name" htmlFor="recipeName" id="recipeName">Recipe Name</label>
                                <input onChange={this.handleChange} name="recipeName" className="recipeNameInput input" id="recipeName" type="text" value={this.state.recipeName} required/>
                            </div>
                            
                            <div className="ingredientContainer container">
                                <label className="ingredientsLabel name" id="currentIngredient" htmlFor="recipeIngredients">Ingredients</label>
                                <input onChange={this.handleChange} name="recipeIngredients" className="ingredientsInput input" id="currentIngredient" value={this.state.currentIngredient} type="text"/>
                                <button className="ingredientButton recipeButton" onClick={this.addNewIngredient}><i class="fas fa-plus"></i></button>
                            </div>
                            <div value={this.state.ingredientsListUnsubmitted} className="ingredientsListUnsubmitted">
                                {this.state.recipeIngredients.map((item) => {
                                    return (
                                        <p className="ingredientsList list">{item}</p>
                                    )
                                })}
                            </div>   
                            
                            <div className="directionsContainer container">
                                <label htmlFor="recipeDirections" name="recipeDirections" className="directionsLabel name" id="currentDirections">Directions</label>
                                <input onChange={this.handleChange} className="recipeDirectionsInput input" id="currentDirections" value={this.state.currentDirections} type="text"/>
                                <button className="directionsButton recipeButton" onClick={this.addNewDirection}><i class="fas fa-plus"></i></button>
                            </div>
                           
                            <div value={this.state.directionsListUnsubmitted} className="directionsListUnsubmitted">
                                {this.state.recipeDirections.map((item) => {
                                    return (
                                        <p className="directionsList list">{item}</p>
                                    )
                                })}
                            </div>   
                        </div>
                       <input className="submitRecipe" type="submit" value="Add to List"/>
                    </form>
                </div>
            </section>
        )
    }
}

export default NewRecipe;
