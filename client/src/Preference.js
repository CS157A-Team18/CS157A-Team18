import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Preference.css'

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
        margin: theme.spacing(5, 0, 0, 0),
    },
}));

export default function Preference() { 
    const classes = styles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <label id="question">What type of food do you like?</label>

                    <Grid className={classes.button}>
                        <ButtonGroup fullWidth aria-label="full width outlined button group">
                            <Button>Asian</Button>
                            <Button>African</Button>
                            <Button>European</Button>
                        </ButtonGroup>
                    </Grid>

                    <div className="continueButton">
                        <Button variant="contained" color="primary" className={classes.button}>Continue</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}