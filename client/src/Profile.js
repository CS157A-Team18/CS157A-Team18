import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './Profile.css';
import { getUID, reauthenticateUser, changePassword } from './firebase/firebaseAuth.js'

const util = require('util');

const styles = theme => ({
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
});

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisable: true,
            firstName: "",
            lastName: "",
            emailAddress: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            isLoading: true
        }
    }

    componentDidMount = () => {
        getUID().then(user => {
            fetch(util.format('%s/api/profile?uid=%s', process.env.REACT_APP_EXPRESS_BACKEND, user.uid), {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then(response => {
                    return response.json()
                })
                .then(responseData => {
                    this.setState({
                        firstName: responseData.first_name,
                        lastName: responseData.last_name,
                        isLoading: false
                    })
                })
        })
    }

    updateFirstName = e => {
        this.setState({firstName: e.target.value})
    }

    updateLastName = e => {
        this.setState({lastName: e.target.value})
    }

    updateEmailAddress = e => {
        this.setState({emailAddress: e.target.value})
    }

    updateCurrentPassword = e => {
        this.setState({currentPassword: e.target.value})
    }

    updateNewPassword = e => {
        this.setState({newPassword: e.target.value})
    }

    updateConfirmPassword = e => {
        this.setState({confirmPassword: e.target.value})
    }
    
    handleEdit = () => {
        document.getElementById("firstname").disabled = !this.state.isDisable
        document.getElementById("lastname").disabled = !this.state.isDisable
    
    
        if (this.state.isDisable === true) {
            // Case when text fields are editable
    
            // Sets the text field color to black
            document.getElementById("firstname").style.color = "black"
            document.getElementById("lastname").style.color = "black"
    
            document.getElementById("doneButton").style.display = "inline"
            document.getElementById("editButton").style.display = "none"
            this.setState({isDisable: false})
        } else {
            getUID().then(user => {
                fetch(util.format('%s/api/profile', process.env.REACT_APP_EXPRESS_BACKEND), {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        uid: user.uid,
                        firstName: document.getElementById("firstname").value,
                        lastName: document.getElementById("lastname").value
                    })
                })
                    .then(result => {
                        console.log(result) // 500 = Internal Service Error; 201 = CREATED
                        if (result.ok) {
                            // Handle successful signup here
                            return
                        }
                        // Handle non-successful signup here
                    })
            })
    
            // Sets the text field color to gray
            document.getElementById("firstname").style.color = "gray"
            document.getElementById("lastname").style.color = "gray"
    
            document.getElementById("editButton").style.display = "inline"
            document.getElementById("doneButton").style.display = "none"
            this.setState({isDisable: true})
        }
    }

    handlePasswordEdit = () => {
        document.getElementById("password").disabled = false
        document.getElementById("newPassword").disabled = false
        document.getElementById("confirmPassword").disabled = false
        
        // Sets the text field color to black
        document.getElementById("password").style.color = "black"
        document.getElementById("newPassword").style.color = "black"
        document.getElementById("confirmPassword").style.color = "black"

        document.getElementById("passwordDoneButton").style.display = "inline"
        document.getElementById("passwordEditButton").style.display = "none"    
    }

    handleCompletedPasswordEdit = () => {
        getUID().then(user => {
            reauthenticateUser(user, this.state.currentPassword).then(() => {
                console.log("User reauthenticated")
                changePassword(user, this.state.newPassword).then(() => {
                    console.log("Password set successfully")
                    document.getElementById("password").disabled = true
                    document.getElementById("newPassword").disabled = true
                    document.getElementById("confirmPassword").disabled = true

                    // Sets the text field color to gray
                    document.getElementById("password").style.color = "gray"
                    document.getElementById("newPassword").style.color = "gray"
                    document.getElementById("confirmPassword").style.color = "gray"
            
                    document.getElementById("passwordEditButton").style.display = "inline"
                    document.getElementById("passwordDoneButton").style.display = "none"
                }).catch(err => {
                    // Handle error message here. The most likely error will be caused
                    // by not meeting the password requirements (e.g. password too short)
                    console.log(err)
                })
            }).catch(err => {
                // Handle wrong password here
                console.log(err)
            })
        })
    }
    

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate id="submitForm">
                            <label id="welcome">Personal Information</label>
                            <Button onClick={this.handleEdit} id="editButton">[Edit]</Button>
                            <Button onClick={this.handleEdit} id="doneButton">[Done]</Button>
                            {/* <IconButton onClick= {handleEdit} id="editIcon">
                                <CreateIcon></CreateIcon>
                            </IconButton>
    
                            <IconButton onClick= {handleEdit} id="checkIcon">
                                <CheckIcon></CheckIcon>
                            </IconButton> */}
    
                            {/* <label id="editLabel">Edit</label> */}
    
                            <TextField
                                id="firstname"
                                label="First Name"
                                margin="normal"
                                fullWidth
                                disabled='true'
                                value={!this.state.isLoading ? this.state.firstName : "Loading..."}
                                onChange={this.updateFirstName}
                            />
    
                            <TextField
                                id="lastname"
                                label="Last Name"
                                margin="normal"
                                fullWidth
                                disabled='true'
                                value={!this.state.isLoading ? this.state.lastName : "Loading..."}
                                onChange={this.updateLastName}
                            />
    
                            <label id="welcome">Password</label>
                            <Button onClick={this.handlePasswordEdit} id="passwordEditButton">[Edit]</Button>
                            <Button onClick={this.handleCompletedPasswordEdit} id="passwordDoneButton">[Done]</Button>
    
                            <TextField
                                id="password"
                                label="Current Password"
                                margin="normal"
                                fullWidth
                                type='password'
                                disabled='true'
                                onChange={this.updateCurrentPassword}
                            />
    
                            <TextField
                                id="newPassword"
                                label="New Password"
                                margin="normal"
                                fullWidth
                                type='password'
                                disabled='true'
                                onChange={this.updateNewPassword}
                            />
    
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                margin="normal"
                                fullWidth
                                type='password'
                                disabled='true'
                                onChange={this.confirmPassword}
                            />
    
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Profile)