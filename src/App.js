import React, { Component } from 'react';
import './App.css';
import firebase from './components/firebase';

// COMPONENTS
import Authentication from './components/Header/Authentication'
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
      userRecipeList: [],
      guestRecipeList: [],
      showFullRecipe: false,
      user: false,
      userID: '',
      email: '',
      password: '',
      confirm: ''
    }
  }

  // when the page refreshes or someone logs in or out 
  // update the user in state
  // if there is a userneed to go find the recipes ass. with that user 
  // if not, list the guest recipes
  componentDidMount() {
    // ensuring the user is logged in to have access to the database
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          userID: user.uid,
          user: true
        }, () => {
          dbRef.child(`users/${user.uid}/recipes`).on('value', (snapshot) => {
            this.sortRecipes(snapshot.val());
          })
        })
      } else {
        dbRef.child(`community/recipes`).on('value', (snapshot) => {
          this.sortRecipes(snapshot.val());
        })
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signUp = () => {
    if (this.state.password === this.state.confirm) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((data) => {
          const userID = data.user.uid
          const usersDirectory = firebase.database().ref(`users/${userID}`)
          usersDirectory.set({
            recipes: [],
            email: this.state.email,
            password: this.state.password,
            confirm: this.state.confirm
          })
        });
      this.setState({
        user: true,
        email: '',
        password: '',
        confirm: ''
      })
    }
  }

  logIn = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {

      });
    this.setState({
      user: true,
      formShow: '',
      email: '',
      password: '',
      confirm: ''
    })
  }

  logOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: false
      });
    })
  }

  // turns the recipe object into an array that can be printed to  the page 
  sortRecipes = (recipeObject) => {
    if (this.state.user === true) {
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
          userRecipeList: recipeArray
        })
      }
    } else {
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
          guestRecipeList: recipeArray
        })
      }
    }
  }
  // pushing the recipe information to the database
  addRecipeToDatabase = (name, ingredients, directions) => {
    if (this.state.user === true) {
      dbRef.child(`users/${firebase.auth().currentUser.uid}/recipes`).push({
        recipeName: name,
        recipeIngredients: ingredients,
        recipeDirections: directions
      })
    } else {
      dbRef.child(`community/recipes`).push({
        recipeName: name,
        recipeIngredients: ingredients,
        recipeDirections: directions
      })
    }
  }
  // shows full recipe on the click of a recipe in the recipe list
  showFullRecipe = (recipeKey) => {
    if (this.state.user === true) {
      const currentUserID = firebase.auth().currentUser.uid;
      dbRef.child(`users/${currentUserID}/recipes/${recipeKey}`).once('value', (snapshot) => {
        this.setState({
          showFullRecipe: true,
          recipeKey: recipeKey,
          directions: snapshot.val().recipeDirections,
          ingredients: snapshot.val().recipeIngredients,
          recipeName: snapshot.val().recipeName
        })
      })
    } else {
      dbRef.child(`community/recipes/${recipeKey}`).once('value', (snapshot) => {
        this.setState({
          showFullRecipe: true,
          recipeKey: recipeKey,
          directions: snapshot.val().recipeDirections,
          ingredients: snapshot.val().recipeIngredients,
          recipeName: snapshot.val().recipeName
        })
      })
    }
  }
  exitFullRecipe = () => {
    this.setState({
      showFullRecipe: false
    })
  }
  render() {
    return (
      <section>
        <Authentication
          handleChange={this.handleChange}
          signUp={this.signUp}
          emailState={this.state.email} passwordState={this.state.password}
          confirmState={this.state.confirm}
          logIn={this.logIn}
          userState={this.state.user}
          logOut={this.logOut}
        />
        <div className="App wrapper">
          <div className="appContainer">
            {this.state.showFullRecipe === false ?
              <NewRecipe addRecipeToDatabase={this.addRecipeToDatabase} /> :
              <RecipeCard exitFullRecipe={this.exitFullRecipe} recipeKey={this.state.recipeKey} directions={this.state.directions} ingredients={this.state.ingredients} recipeName={this.state.recipeName} />}
            <RecipeList showFullRecipe={this.showFullRecipe} userState={this.state.user} userRecipes={this.state.userRecipeList}
              guestRecipes={this.state.guestRecipeList} />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
