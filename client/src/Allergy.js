import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Allergy.css';

const styles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(15, 8),
        isplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(3, 3, 0, 3),
    },
}));

export default function Allergy() { 

    const handleYes = () => { 
        document.getElementById("firstAllergyButtons").style.display = "block";
        document.getElementById("secondAllergyButtons").style.display = "block";
        document.getElementById("question").innerHTML = "Select your allergies"
        document.getElementById("yesButton").style.display = "none";
        document.getElementById("noButton").style.display = "none";
        document.getElementById("continueButton").style.display = "block";
    }

    const classes = styles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <label id="question">Do you have any food allergies?</label>

                    <Grid className={classes.button}>
                        <div className = "firstAllergySelection">
                            <ButtonGroup fullwidth aria-label="full width outlined button group" id="firstAllergyButtons">
                                <Button>Eggs</Button>
                                <Button>TreeNuts</Button>
                                <Button>Peanuts</Button>
                                <Button>Shellfish</Button>  
                            </ButtonGroup>
                        </div>
                        <div className = "secondAllergySelection">
                            <ButtonGroup fullwidth aria-label="full width outlined button group" id="secondAllergyButtons">
                                <Button>Wheat</Button>
                                <Button>Soy</Button>
                                <Button>Fish</Button>
                            </ButtonGroup>
                        </div>
                        <div className="optionButtons">
                            <Button id="yesButton" variant="contained" color="primary" className={classes.button} onClick={handleYes}>Yes</Button>
                            <Button id="noButton" variant="contained" color="primary" className={classes.button}>No</Button>
                        </div>
                        <div className = "nextButton">
                            <Button id="continueButton" variant="contained" color="primary" className={classes.button}>Continue</Button>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}