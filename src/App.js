import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// COMPONENTS
import Header from './components/Header/Header'
import NewRecipe from './components/NewRecipe/NewRecipe'
import RecipeList from './components/RecipeList/RecipeList'
import RecipeCard from './components/RecipeCard/RecipeCard'

const dbRef = firebase.database().ref();

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeList: [],
      showFullRecipe: false
    }
  }
  componentDidMount() {
    // firebase ref call
    dbRef.on('value', (snapshot) => {
        this.sortRecipes(snapshot.val()); 
    });
  }
  sortRecipes = (recipeObject) => {
    if (recipeObject) {
      const recipeArray = Object.entries(recipeObject).map((item) => {
        return ({
          key: item[0],
          recipeName: item[1].recipeName,
          recipeIngredients: item[1].recipeIngredients,
          recipeDirections: item[1].recipeDirections
        })
      });
      this.setState({
        recipeList: recipeArray
      })
    }
  }
  addRecipeToDatabase = (name, ingredients, directions) => {
    // console.log('add rec fired');
    dbRef.push({
      recipeName: name,
      recipeIngredients: ingredients,
      recipeDirections: directions
    })

  }
  showFullRecipe = (recipeKey) => {
    console.log(recipeKey)
    this.setState({
      showFullRecipe: !this.state.showFullRecipe,
      recipeKey: recipeKey
    })
  }
  render() {
    return (
      <div className="App wrapper">
        <Header />
      <div className="appContainer">
          {this.state.showFullRecipe === false ? <NewRecipe addRecipeToDatabase={this.addRecipeToDatabase} /> : <RecipeCard showFullRecipe={this.state.showFullRecipe}/>}
        <RecipeList showFullRecipe={this.showFullRecipe} recipes={this.state.recipeList}/>
      </div>
      </div>
    );
  }
}

export default App;
