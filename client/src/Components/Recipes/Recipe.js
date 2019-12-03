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
import {getUID} from '../../firebase/firebaseAuth'

const util = require('util');
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

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
            recipe_id: "",
            recipeName: "",
            likes: 15,
            dislikes: 15,
            tutorialLink: "",
            pictureLink: "http://getwallpapers.com/wallpaper/full/7/3/0/1183957-popular-healthy-food-wallpaper-2560x1600-download-free.jpg",

            ingredientColumns: [
                { title: 'Name', field: 'name' },
                { title: 'Amount', field: 'amount'},
                { title: 'Measurement', field: 'measurement'}
            ],
            instructionColumns: [
                { title: 'Steps', field: 'instruction' },
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
                {instruction: "First step"},
                {instruction: "Second step"}
            ],
        }
    }

    componentDidMount() {
        this.state.recipe_id = this.getUrlVars()["recipe_id"]
        getUID().then(user => {
            fetch(util.format('%s/api/recipe?uid=%s&recipe_id=%s', process.env.REACT_APP_EXPRESS_BACKEND, user.uid, this.state.recipe_id), {
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
                    recipeName: responseData.name,
                    likes: responseData.likes,
                    dislikes: responseData.dislikes,
                    tutorialLink: responseData.vidURL,
                    pictureLink: responseData.imgURL,
                    ingredientData: responseData.ingredients,
                    instructionData: responseData.instructions
                })
            })
        })
        
    }

    getUrlVars = () => {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    handleLike = e => {
        // console.log(this.getUrlVars()["recipe_id"])
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
                            </div>
                    </div>
        
                    <div className="showMode" id="showMode">
                        <div className={classes.section}>
                            <label id ="foodTitle">{this.state.recipeName}</label>
                        </div>
                        
                        <div className={classes.section}>
                            <label id ="titleLabel">Ingredients:</label>
                            <br/><br/>
                            <ul>
                                {this.state.ingredientData.map(value => <li>{value.name}</li>)}
                            </ul>
                        </div>
                        <div className={classes.section}>
                            <label id ="titleLabel">Instructions:</label>
                            <br/>
                            <ul>
                                {this.state.instructionData.map(value => <li>{value.instruction}</li>)}
                            </ul>
                        </div>
                        <div className={classes.section}>
                                <label id ="titleLabel">Tutorial Link:</label>
                                <a id ="linkRef" href={this.state.tutorialLink}>Click here for video tutorial</a>
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
                </Grid>
                <Grid item xs={false} sm={4} md={7}>
                    <img src={this.state.pictureLink} alt="recipe" id="recipePic"></img>
                    {/* </img>className={classes.image} */}
                    
                </Grid> 
            </Grid>      
        )
    }
}

export default withStyles(styles)(Recipe)