import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Preference.css'
import { withStyles } from '@material-ui/core/styles';

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
        margin: theme.spacing(5, 0, 0, 0),
    },
});

class Preference extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            foodTypes: ["Asian", "African", "European"],
            preferences: []
        }
    }

    handleAsianTap = e => {
        console.log(this.state.foodTypes[0])
        if (this.state.preferences.includes(1)) {
            this.state.preferences.splice(this.state.preferences.indexOf(1), 1)
        } else {
            this.state.preferences.push(1)
        }
        console.log(this.state.preferences)
    }

    handleAfricanTap = e => {
        console.log(this.state.foodTypes[1])
        if (this.state.preferences.includes(2)) {
            this.state.preferences.splice(this.state.preferences.indexOf(2), 1)
        } else {
            this.state.preferences.push(2)
        }
        console.log(this.state.preferences)
    }

    handleEuropeanTap = e => {
        console.log(this.state.foodTypes[2])
        if (this.state.preferences.includes(3)) {
            this.state.preferences.splice(this.state.preferences.indexOf(3), 1)
        } else {
            this.state.preferences.push(3)
        }
        console.log(this.state.preferences)
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <label id="question">What type of food do you like?</label>

                    <Grid className={classes.button}>
                        <ButtonGroup fullWidth aria-label="full width outlined button group">
                            <Button onClick= {this.handleAsianTap}>Asian</Button>
                            <Button onClick = {this.handleAfricanTap}>African</Button>
                            <Button onClick = {this.handleEuropeanTap}>European</Button>
                        </ButtonGroup>
                    </Grid>

                    <div className="continueButton">
                        <Button variant="contained" color="primary" className={classes.button}>Continue</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(Preference)

// export default function Preference() { 
//     const classes = styles();
//     return (
//         <Grid container className={classes.root}>
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <div className={classes.paper}>
//                     <label id="question">What type of food do you like?</label>

//                     <Grid className={classes.button}>
//                         <ButtonGroup fullWidth aria-label="full width outlined button group">
//                             <Button>Asian</Button>
//                             <Button>African</Button>
//                             <Button>European</Button>
//                         </ButtonGroup>
//                     </Grid>

//                     <div className="continueButton">
//                         <Button variant="contained" color="primary" className={classes.button}>Continue</Button>
//                     </div>
//                 </div>
//             </Grid>
//         </Grid>
//     )
// }