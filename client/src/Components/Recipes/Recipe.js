import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Recipe.css';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(10, 10),
        isplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        backgroundImage: 'url(https://icl.coop/wp-content/uploads/2015/10/BBQ-Pecans.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    button: {
        //margin: theme.spacing(3, 0, 2),
        marginLeft: theme.spacing(3),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    section: {
        margin: theme.spacing(5, 0, 5, 0),
    },
    textField: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(1),
        width: 500,
    },
  });

  const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
};

  class Recipe extends React.Component { 
    //const classes = styles();

    constructor(props) {
        super(props);
        
        this.state = {
            recipeName: "",
            likes: 15,
            dislikes: 15,
            //ingredients: [],
            instructions: ["step1", "step2", "step3"],
            tutorialLink: "",
            pictureLink: "",

            ingredientColumns: [
                { title: 'Name', field: 'name' },
                { title: 'Amount', field: 'amount'},
                { title: 'Measurement', field: 'measurement'}
            ],
            instructionColumns: [
                { title: 'Steps', field: 'description' },
            ],
            ingredientData: [
                { name: 'Soy sauce', amount: 63, measurement: 'oz'},
                {
                name: 'Sugar',
                amount:90,
                measurement: 'kg'
                },
            ],
            instructionData: [
                {description: "First step"},
                {description: "Second step"}
            ],
        }
    }

    handleLike = e => {
        if  (document.getElementById("likeButton").style.color == "blue") {
            //deselect
            document.getElementById("likeButton").style.color = "gray";
        } else {
            document.getElementById("likeButton").style.color = "blue";
            document.getElementById("dislikeButton").style.color = "gray";
        }
    }

    handleDislike = e => {
        if  (document.getElementById("dislikeButton").style.color == "red") {
            //deselect
            document.getElementById("dislikeButton").style.color = "gray";
        } else {
            document.getElementById("dislikeButton").style.color = "red";
            document.getElementById("likeButton").style.color = "gray";
        }
    }

    handleEdit = e => {
        document.getElementById("editMode").style.display = "block"
        document.getElementById("showMode").style.display = "none"
    }

    handleShow = e => {
        document.getElementById("editMode").style.display = "none"
        document.getElementById("showMode").style.display = "block"
    }

    handleCancel = e => {
        document.getElementById("editMode").style.display = "none"
        document.getElementById("showMode").style.display = "block"
    }

    updateRecipe = e => {
        this.setState({recipeName: e.target.value})
    }

    updateTutorialLink = e => {
        this.setState({tutorialLink: e.target.value})
    }

    // showInstruction = () => {
    //     {this.state.instructions.map(item => {
    //         console.log(item)
    //     })}
    // }

    render() { 
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div className="editMode" id="editMode">
                            <div className={classes.section}>
                                <label id ="titleLabel">Recipe name:</label>
                                <TextField
                                    id="recipeName"
                                    label="Type in your recipe name"
                                    margin="dense"
                                    fullWidth
                                    onChange={this.updateRecipe}
                                />
                            </div>
                            <label id ="titleLabel">Ingredients:</label>
                            <div className={classes.section}>
                                <MaterialTable className={classes.table}
                                    icons={tableIcons}
                                    title=""
                                    columns={this.state.ingredientColumns}
                                    data={this.state.ingredientData}
                                    editable={{
                                        onRowAdd: newData =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const ingredientData = [...prevState.ingredientData];
                                                ingredientData.push(newData);
                                                return { ...prevState, ingredientData };
                                            });
                                            }, 600);
                                        }),
                                        onRowUpdate: (newData, oldData) =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            if (oldData) {
                                                this.setState(prevState => {
                                                const ingredientData = [...prevState.ingredientData];
                                                ingredientData[ingredientData.indexOf(oldData)] = newData;
                                                return { ...prevState, ingredientData };
                                                });
                                            }
                                            }, 600);
                                        }),
                                        onRowDelete: oldData =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const ingredientData = [...prevState.ingredientData];
                                                ingredientData.splice(ingredientData.indexOf(oldData), 1);
                                                return { ...prevState, ingredientData };
                                            });
                                            }, 600);
                                        }),
                                    }}
                                    options={{
                                        search: false
                                    }}
                                />
                            </div>

                            <label id ="titleLabel">Instructions:</label>
                    
                            <div className={classes.section}>
                                <MaterialTable className={classes.table}
                                    icons={tableIcons}
                                    title=""
                                    columns={this.state.instructionColumns}
                                    data={this.state.instructionData}
                                    editable={{
                                        onRowAdd: newData =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const instructionData = [...prevState.instructionData];
                                                instructionData.push(newData);
                                                return { ...prevState, instructionData };
                                            });
                                            }, 600);
                                        }),
                                        onRowUpdate: (newData, oldData) =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            if (oldData) {
                                                this.setState(prevState => {
                                                const instructionData = [...prevState.instructionData];
                                                instructionData[instructionData.indexOf(oldData)] = newData;
                                                return { ...prevState, instructionData };
                                                });
                                            }
                                            }, 600);
                                        }),
                                        onRowDelete: oldData =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                            resolve();
                                            this.setState(prevState => {
                                                const instructionData = [...prevState.instructionData];
                                                instructionData.splice(instructionData.indexOf(oldData), 1);
                                                return { ...prevState, instructionData };
                                            });
                                            }, 600);
                                        }),
                                    }}
                                    options={{
                                        search: false
                                    }}
                                />
                            </div>

                            <div className={classes.section}>
                                <label id ="titleLabel">Tutorial Link:</label>
                                <TextField
                                    id="tutorial"
                                    label="Type in the video link"
                                    margin="dense"
                                    fullWidth
                                    onChange={this.updateTutorialLink}
                                />
                            </div>

                            <div className={classes.section}>
                                <label id ="titleLabel">Upload image:</label>
                                {/* <IconButton type="file">
                                    <AddCircleIcon/>
                                    
                                </IconButton> */}
                                <br/>
                                <br/>
                                <input type="file" name="picture" accept="image/*" id="imagePicker"></input>   
                            </div>

                            <div className={classes.section}>
                                <Button id="submitButton" 
                                        variant="contained" 
                                        color="primary" 
                                        // className={classes.button} 
                                        onClick={this.handleCancel}
                                        >
                                        Cancel
                                </Button>

                                <Button id="submitButton" 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.button} 
                                        onClick={this.handleShow}
                                        >
                                        Save
                                </Button>

                                <Button id="submitButton" 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.button} 
                                        //onClick={this.handleShow}
                                        >
                                        Add to Favourite
                                </Button>
                            </div>
                    </div>
        
                    <div className="showMode" id="showMode">
                        <div className={classes.section}>
                            <label id ="foodTitle">Barbeque Pecans</label>
                        </div>
                        
                        <div className={classes.section}>
                            <label id ="titleLabel">Ingredients:</label>
                            <br/><br/>
                            <LocalDiningIcon/>
                            <label id ="ingredientLabel"> 1 tablespoon Bad Byron's Butt Rub</label>
                        </div>
                        <div className={classes.section}>
                            <label id ="titleLabel">Instructions:</label>
                            <br/>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="5 items"
                                multiline
                                rowsMax="4"
                                value={this.state.instructions.map(item => item)}
                                //onChange={handleChange}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.section}>
                                <label id ="titleLabel">Tutorial Link:</label>
                                <a id ="linkRef" href= "https://www.youtube.com/watch?v=943loiK6M70">Click here for video tutorial</a>
                        </div>

                        <Button variant="outlined" color="primary" onClick={this.handleEdit}>
                            Edit
                        </Button>

                        <div className={classes.section}>
                            <label id ="titleLabel">Number of Likes: {this.state.likes}</label>
                        </div>
                        <div className={classes.section}>
                            <label id ="titleLabel">Number of Dislikes: {this.state.dislikes}</label>
                        </div>
                        <IconButton id="likeButton" onClick = {this.handleLike} aria-label="like">
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton id = "dislikeButton" onClick = {this.handleDislike} aria-label="dislike">
                            <ThumbDownIcon />
                        </IconButton>
                    </div>
                </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />  
            </Grid>      
        )
    }
}

export default withStyles(styles)(Recipe)