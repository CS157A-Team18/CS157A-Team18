import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './Profile.css';

const state = {
    isDisable: true,
    isPasswordDisable: true
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

    if (state.isDisable === true) {
        // document.getElementById("editLabel").textContent = "Done"
        document.getElementById("doneButton").style.display = "inline"
        document.getElementById("editButton").style.display = "none"
        state.isDisable = false
    } else {

        //submit changes
        //update database here

        document.getElementById("editButton").style.display = "inline"
        document.getElementById("doneButton").style.display = "none"
        state.isDisable = true
    }
}

const handlePasswordEdit = () => {
    document.getElementById("password").disabled = !state.isPasswordDisable
    document.getElementById("newPassword").disabled = !state.isPasswordDisable
    document.getElementById("confirmPassword").disabled = !state.isPasswordDisable

    if (state.isPasswordDisable === true) {
        // document.getElementById("editLabel").textContent = "Done"
        document.getElementById("passwordDoneButton").style.display = "inline"
        document.getElementById("passwordEditButton").style.display = "none"
        state.isPasswordDisable = false
    } else {

        //submit changes
        //update database here

        document.getElementById("passwordEditButton").style.display = "inline"
        document.getElementById("passwordDoneButton").style.display = "none"
        state.isPasswordDisable = true
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
                        <Button onClick= {handleEdit} id="editButton">[Edit]</Button>
                        <Button onClick= {handleEdit} id="doneButton">[Done]</Button>
                        {/* <IconButton onClick= {handleEdit} id="editIcon">
                            <CreateIcon></CreateIcon>
                        </IconButton>

                        <IconButton onClick= {handleEdit} id="checkIcon">
                            <CheckIcon></CheckIcon>
                        </IconButton> */}

                        {/* <label id="editLabel">Edit</label> */}

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

                        <label id="welcome">Password</label>
                        <Button onClick= {handlePasswordEdit} id="passwordEditButton">[Edit]</Button>
                        <Button onClick= {handlePasswordEdit} id="passwordDoneButton">[Done]</Button>
                        
                        <TextField
                            id="password"
                            label="Current Password"
                            margin="normal"
                            fullWidth
                            type='password'
                            disabled = 'true'
                        />

                        <TextField
                            id="newPassword"
                            label="New Password"
                            margin="normal"
                            fullWidth
                            type='password'
                            disabled = 'true'
                        />

                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
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