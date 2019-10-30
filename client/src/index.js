import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import './Login.css';

//from material ui
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const styles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(25, 4),
        isplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
  }));

export default function Login() {

    const state = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    const updateEmail = e => {
        state.email = e.target.value
    }
    
    const updatePassword = e => {
        state.password = e.target.value
    }

    const updateConfirmPassword = e => {
        state.confirmPassword = e.target.value
    }

    const test = () => {
        console.log(state.email)
        console.log(state.password)
        console.log(state.confirmPassword)
    }

    const switchToSignupPage = () => {
        document.getElementById("submitButton").innerHTML = "Sign up"
        document.getElementById("welcome").innerHTML = "Glad to have you here!"
        document.getElementById("forgotLink").style.display = "none";
        document.getElementById("createAccountLink").style.display = "none";
        document.getElementById("backLink").style.display = "block";
        document.getElementById("confirmTextField").style.display = "block";
    }

    const switchToLoginPage = () => {
        document.getElementById("submitButton").innerHTML = "Login"
        document.getElementById("welcome").innerHTML = "Welcome back!"
        document.getElementById("forgotLink").style.display = "block";
        document.getElementById("createAccountLink").style.display = "block";
        document.getElementById("backLink").style.display = "none";
        document.getElementById("confirmTextField").style.display = "none";
    }

    const classes = styles();
    return (
        <div className="Index">
            <Grid container className={classes.root}>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />  
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate id="submitForm">
                            <label id="welcome">Welcome back!</label>
                            
                            <TextField
                                id="standard-username"
                                label="Username"
                                margin="normal"
                                autoFocus
                                fullWidth
                                onChange={updateEmail}
                            />

                            <TextField
                                id="standard-password"
                                label="Password"
                                type="password"
                                margin="normal"
                                fullWidth
                                onChange={updatePassword}
                            />

                            <div className={"thirdTextField"} noValidate id="confirmTextField">
                                <TextField
                                    id="confirmPassword"
                                    label="Confirm password"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                    onChange={updateConfirmPassword}
                                />
                            </div>

                            <Button id="submitButton" 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button} 
                                    fullWidth 
                                    onClick= {test}>
                                    Login
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" id = "forgotLink">
                                        Forgot password?
                                    </Link>
                                </Grid>

                                <Grid item xs>
                                    <Link href="#" onClick={switchToLoginPage} variant="body2" id = "backLink">
                                        Back to login
                                    </Link>
                                </Grid>

                                <Grid item xs>
                                    <Link href="#" onClick={switchToSignupPage} variant="body2" id = "createAccountLink">
                                        Create a new account
                                    </Link>
                                </Grid>

                            </Grid>
                            
                        </form>
                    </div>
                </Grid> 
            </Grid>
        </div>
    );   
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
