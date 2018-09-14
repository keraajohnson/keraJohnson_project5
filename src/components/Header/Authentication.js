import React, { Component } from 'react';
import firebase from 'firebase';

class Authentication extends Component {
    constructor() {
        super();
        this.state = {
            formShow: '',
        }
    }
    // showing the correct form based on what the user clicked on
    formShow = (e) => {
        e.preventDefault();
        this.setState({
            formShow: e.target.className
        })
    }

    clearForm = (e) => {
        e.preventDefault();
        if (e.target.id === 'signUp'){
            this.props.signUp();
        } else {
            this.props.logIn();
        }
        this.setState({
            formShow: ''
        })
    }
    render() {
            let formLogin = '';
            if (this.state.formShow === 'signUp') {
                formLogin = (
                    <form onSubmit={this.clearForm} value={this.state.formShow} className='userForm wrapper signUp' id="signUp">
                        <label htmlFor="email">Email:</label>
                        <input type='email' className="email" name='email' onChange={this.props.handleChange} value={this.props.emailState} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="password" value={this.props.passwordState} name="password" onChange={this.props.handleChange} />
                        <label htmlFor="confirm">Confirm Password:</label>
                        <input type="password" className="confirm" name="confirm" value={this.props.confirmState} onChange={this.props.handleChange} />
                        <button>Sign Up</button>
                    </form>
                );
            } else if (this.state.formShow === 'logIn') {
                formLogin = (
                    <form onSubmit={this.clearForm} value={this.state.formShow} className="userForm wrapper logIn">
                        <label htmlFor="email">Email: </label>
                        <input type="email" className="email" name="email" value={this.props.email} onChange={this.props.handleChange} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="password" value={this.props.password} name="password" onChange={this.props.handleChange} />
                        <button>Log In</button>
                    </form>
                )
            }
        return (
            <header>
                <div className="auth">
                    <nav className="wrapper">
                        <ul>
                            {this.props.userState ? <div className="loggedIn">
                                        <p>You are logged in</p> 
                                        <li><a href="" className="logOut" onClick={this.props.logOut}>Log Out</a></li>
                                    </div> : 
                            <div className="loggedOut">
                                <li><a href="" className="signUp" onClick={this.formShow}>Sign Up</a></li>
                                <li><a href="" className="logIn" onClick={this.formShow}>Log In</a></li>
                            </div>}
                           
                        </ul>
                    </nav>
                    {formLogin}
                </div>
                <div className="heading">
                    <h1 className="heading">Recipe Box</h1>
                </div>
            </header>
        )
        }
    }

export default Authentication;