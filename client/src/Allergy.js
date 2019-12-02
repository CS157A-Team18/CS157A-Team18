import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Allergy.css';
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
        textAlign: 'center',
    },
    button: {
        margin: theme.spacing(3, 3, 0, 3),
    },
});



class Allergy extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            allergies: ["Eggs", "Treenuts", "Peanuts", "Shellfish", "Wheat", "Soy", "Fish"],
            selectedAllergies: []
        }
    }

    handleEggTap = e => {
        console.log(this.state.allergies[0])
        if (this.state.selectedAllergies.includes(1)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(1), 1)
        } else {
            this.state.selectedAllergies.push(1)
        }
        console.log(this.state.selectedAllergies)
    }

    handleTreenutTap = e => {
        console.log(this.state.allergies[1])
        if (this.state.selectedAllergies.includes(2)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(2), 1)
        } else {
            this.state.selectedAllergies.push(2)
        }
        console.log(this.state.selectedAllergies)
    }

    handlePeanutTap = e => {
        console.log(this.state.allergies[2])
        if (this.state.selectedAllergies.includes(3)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(3), 1)
        } else {
            this.state.selectedAllergies.push(3)
        }
        console.log(this.state.selectedAllergies)
    }

    handleShellfishTap = e => {
        console.log(this.state.allergies[3])
        if (this.state.selectedAllergies.includes(4)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(4), 1)
        } else {
            this.state.selectedAllergies.push(4)
        }
        console.log(this.state.selectedAllergies)
    }

    handleWheatTap = e => {
        console.log(this.state.allergies[4])
        if (this.state.selectedAllergies.includes(5)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(5), 1)
        } else {
            this.state.selectedAllergies.push(5)
        }
        console.log(this.state.selectedAllergies)
    }

    handleSoyTap = e => {
        console.log(this.state.allergies[5])
        if (this.state.selectedAllergies.includes(6)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(6), 1)
        } else {
            this.state.selectedAllergies.push(6)
        }
        console.log(this.state.selectedAllergies)
    }

    handleFishTap = e => {
        console.log(this.state.allergies[6])
        if (this.state.selectedAllergies.includes(7)) {
            this.state.selectedAllergies.splice(this.state.selectedAllergies.indexOf(7), 1)
        } else {
            this.state.selectedAllergies.push(7)
        }
        console.log(this.state.selectedAllergies)
    }

    handleYes = () => { 
        document.getElementById("firstAllergyButtons").style.display = "block";
        document.getElementById("secondAllergyButtons").style.display = "block";
        document.getElementById("question").innerHTML = "Select your allergies"
        document.getElementById("yesButton").style.display = "none";
        document.getElementById("noButton").style.display = "none";
        document.getElementById("continueButton").style.display = "block";
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <label id="question">Do you have any food allergies?</label>

                    <Grid className={classes.button}>
                        <div className = "firstAllergySelection">
                            <ButtonGroup fullwidth aria-label="full width outlined button group" id="firstAllergyButtons">
                                <Button onClick = {this.handleEggTap}>Eggs</Button>
                                <Button onClick = {this.handleTreenutTap}>TreeNuts</Button>
                                <Button onClick = {this.handlePeanutTap}>Peanuts</Button>
                                <Button onClick = {this.handleShellfishTap}>Shellfish</Button>  
                            </ButtonGroup>
                        </div>
                        <div className = "secondAllergySelection">
                            <ButtonGroup fullwidth aria-label="full width outlined button group" id="secondAllergyButtons">
                                <Button onClick = {this.handleWheatTap}>Wheat</Button>
                                <Button onClick = {this.handleSoyTap}>Soy</Button>
                                <Button onClick = {this.handleFishTap}>Fish</Button>
                            </ButtonGroup>
                        </div>
                        <div className="optionButtons">
                            <Button id="yesButton" variant="contained" color="primary" className={classes.button} onClick={this.handleYes}>Yes</Button>
                            <Button id="noButton" variant="contained" color="primary" className={classes.button}>No</Button>
                        </div>
                        <div className = "nextButton">
                            <Button id="continueButton" variant="contained" color="primary" className={classes.button}>Continue</Button>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </Grid>
        );
    }

    
}

export default withStyles(styles)(Allergy)

// export default function Allergy() { 

//     const handleYes = () => { 
//         document.getElementById("firstAllergyButtons").style.display = "block";
//         document.getElementById("secondAllergyButtons").style.display = "block";
//         document.getElementById("question").innerHTML = "Select your allergies"
//         document.getElementById("yesButton").style.display = "none";
//         document.getElementById("noButton").style.display = "none";
//         document.getElementById("continueButton").style.display = "block";
//     }

//     const classes = styles();
//     return (
//         <Grid container className={classes.root}>
//             <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                 <div className={classes.paper}>
//                     <label id="question">Do you have any food allergies?</label>

//                     <Grid className={classes.button}>
//                         <div className = "firstAllergySelection">
//                             <ButtonGroup fullwidth aria-label="full width outlined button group" id="firstAllergyButtons">
//                                 <Button>Eggs</Button>
//                                 <Button>TreeNuts</Button>
//                                 <Button>Peanuts</Button>
//                                 <Button>Shellfish</Button>  
//                             </ButtonGroup>
//                         </div>
//                         <div className = "secondAllergySelection">
//                             <ButtonGroup fullwidth aria-label="full width outlined button group" id="secondAllergyButtons">
//                                 <Button>Wheat</Button>
//                                 <Button>Soy</Button>
//                                 <Button>Fish</Button>
//                             </ButtonGroup>
//                         </div>
//                         <div className="optionButtons">
//                             <Button id="yesButton" variant="contained" color="primary" className={classes.button} onClick={handleYes}>Yes</Button>
//                             <Button id="noButton" variant="contained" color="primary" className={classes.button}>No</Button>
//                         </div>
//                         <div className = "nextButton">
//                             <Button id="continueButton" variant="contained" color="primary" className={classes.button}>Continue</Button>
//                         </div>
//                     </Grid>
//                 </div>
//             </Grid>
//         </Grid>
//     )
// }