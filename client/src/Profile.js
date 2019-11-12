import ReactDOM from 'react-dom';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import './Profile.css';

const state = {
    isDisable: true
}

const styles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(15, 8),
        isplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

const handleEdit = () => {
    document.getElementById("firstname").disabled = !state.isDisable
    document.getElementById("lastname").disabled = !state.isDisable
    document.getElementById("username").disabled = !state.isDisable
    document.getElementById("password").disabled = !state.isDisable

    if (state.isDisable == true) {
        document.getElementById("editLabel").textContent = "Done"
        document.getElementById("checkIcon").style.display = "inline"
        document.getElementById("editIcon").style.display = "none"
        state.isDisable = false
    } else {

        //submit changes
        //update database here

        document.getElementById("editLabel").textContent = "Edit"
        document.getElementById("editIcon").style.display = "inline"
        document.getElementById("checkIcon").style.display = "none"
        state.isDisable = true
    }
}

export default function Profile() {
    const classes = styles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate id="submitForm">
                        <label id="welcome">Personal Information</label>

                        <IconButton onClick= {handleEdit} id="editIcon">
                            <CreateIcon></CreateIcon>
                        </IconButton>

                        <IconButton onClick= {handleEdit} id="checkIcon">
                            <CheckIcon></CheckIcon>
                        </IconButton>

                        <label id="editLabel">Edit</label>

                        <TextField
                            id="firstname"
                            label="First name"
                            margin="normal"
                            fullWidth
                            disabled = 'true'
                        />

                        <TextField
                            id="lastname"
                            label="Last name"
                            margin="normal"
                            fullWidth
                            disabled = 'true'
                        />

                        <TextField
                            id="username"
                            label="Username"
                            margin="normal"
                            fullWidth
                            disabled = 'true'
                        />

                        <TextField
                            id="password"
                            label="Password"
                            margin="normal"
                            fullWidth
                            type='password'
                            disabled = 'true'
                        />
                    
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}