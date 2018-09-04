import React, { Component } from 'react';
import './App.css';
import firebase from './components/firebase';

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
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dbRef.on('value', (snapshot) => {
          this.sortRecipes(snapshot.val());
        });
      }
    })
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
    dbRef.push({
      recipeName: name,
      recipeIngredients: ingredients,
      recipeDirections: directions
    })

  }
  showFullRecipe = (recipeKey) => {
    const key = recipeKey
    const dbRef = firebase.database().ref(key);
    dbRef.on('value', (snapshot)=> {
      this.setState({
        showFullRecipe: !this.state.showFullRecipe,
        recipeKey: recipeKey,
        directions: snapshot.val().recipeDirections,
        ingredients: snapshot.val().recipeIngredients,
        recipeName: snapshot.val().recipeName
      })
    })
  }
  render() {
    return (
      <section>
        <Header />
        <div className="App wrapper">
        <div className="appContainer">
            {this.state.showFullRecipe === false ? <NewRecipe addRecipeToDatabase={this.addRecipeToDatabase} /> : <RecipeCard showFullRecipe={this.state.showFullRecipe.showFullRecipe} recipeKey={this.state.recipeKey} directions={this.state.directions} ingredients={this.state.ingredients} recipeName={this.state.recipeName}/>}
          <RecipeList showFullRecipe={this.showFullRecipe} recipes={this.state.recipeList}/>
        </div>
        </div>
      </section>
    );
  }
}

export default App;
