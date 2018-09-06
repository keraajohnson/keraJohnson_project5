import React, { Component } from 'react';
import './App.css';
import firebase from './components/firebase';

// COMPONENTS
import Header from './components/Header/Header'
import NewRecipe from './components/NewRecipe/NewRecipe'
import RecipeList from './components/RecipeList/RecipeList'
import RecipeCard from './components/RecipeCard/RecipeCard'

// firebase reference call
const dbRef = firebase.database().ref();

// app component 
class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeList: [],
      showFullRecipe: false
    }
  }
  componentDidMount() {
    // ensuring the user is logged in to have access to the database
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        dbRef.child(`users/${user.uid}/recipes`).on('value', (snapshot) => {
          this.sortRecipes(snapshot.val());
        });
      }
    })
  }
  // turns the recipe object into an array that can be printed to  the page 
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
  // pushing the recipe information to the database
  addRecipeToDatabase = (name, ingredients, directions) => {
    dbRef.child(`users/${firebase.auth().currentUser.uid}/recipes`).push({
      recipeName: name,
      recipeIngredients: ingredients,
      recipeDirections: directions
    })

  }
  // shows full recipe on the click of a recipe in the recipe list
  showFullRecipe = (recipeKey) => {
    const currentUserID = firebase.auth().currentUser.uid;
    dbRef.child(`users/${currentUserID}/recipes/${recipeKey}`).once('value',(snapshot)=> {
      this.setState({
        showFullRecipe: true,
        recipeKey: recipeKey,
        directions: snapshot.val().recipeDirections,
        ingredients: snapshot.val().recipeIngredients,
        recipeName: snapshot.val().recipeName
      })
    })
  }
  exitFullRecipe = () => {
    this.setState({
      showFullRecipe: false
    })
  }
  render() {
    return (
      <section>
        <Header />
        <div className="App wrapper">
          <div className="appContainer">
              {this.state.showFullRecipe === false ? 
              <NewRecipe addRecipeToDatabase={this.addRecipeToDatabase} /> : 
              <RecipeCard exitFullRecipe={this.exitFullRecipe} recipeKey={this.state.recipeKey} directions={this.state.directions} ingredients={this.state.ingredients} recipeName={this.state.recipeName}/>}
            <RecipeList showFullRecipe={this.showFullRecipe} recipes={this.state.recipeList}/>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
