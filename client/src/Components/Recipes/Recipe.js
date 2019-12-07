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
import {uploadFile} from '../../firebase/firebaseStorage'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { fade } from '@material-ui/core/styles';

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
    grow: {
        flexGrow: 1,
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },

    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: 200,
        },
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    textarea: {
        height: '500px',
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

            isRecipeLiked: 0,
            isRecipeDisliked: 0,
            isRecipeFavorited: 0,
            uid: "",
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
            addedIngredientData: [],
            deletedIngredientData: [],
            editedIngredientData: [],
            instructionData: [
                {instruction: "First step"},
                {instruction: "Second step"}
            ],
            addedInstructionData: [],
            deletedInstructionData: [],
            editedInstructionData: [],
            favoriteButtonText: "Add to Favourite"
            ,
            userFullName: ""
        }
    }

    componentDidMount() {
        this.state.recipe_id = this.getUrlVars()["recipe_id"]
        getUID().then(user => {
            this.setState({uid: user.uid})
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
                    instructionData: responseData.instructions,
                    isRecipeLiked: responseData.userLikedRecipe,
                    isRecipeDisliked: responseData.userDislikedRecipe,
                    isRecipeFavorited: responseData.userFavoritedRecipe,
                    userFullName: util.format('%s %s', responseData.firstName, responseData.lastName),
                })
                if (this.state.isRecipeLiked == true) {
                    document.getElementById("likeButton").style.color = "blue"
                }
        
                if (this.state.isRecipeDisliked == true) {
                    document.getElementById("dislikeButton").style.color = "red"
                }

                if (this.state.isRecipeFavorited) {
                    this.setState({favoriteButtonText: "Remove From Favorites"})
                }
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

    addLikeToDB = () => {
        return fetch(util.format('%s/api/recipe/addLike', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    removeLikeFromDB = () => {
        return fetch(util.format('%s/api/recipe/delLike', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    addDislikeToDB = () => {
        return fetch(util.format('%s/api/recipe/addDislike', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    removeDislikeFromDB = () => {
        return fetch(util.format('%s/api/recipe/delDislike', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    addRecipeToFavorites = () => {
        return fetch(util.format('%s/api/recipe/addFavorite', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    removeRecipeFromFavorites = () => {
        return fetch(util.format('%s/api/recipe/delFavorite', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    handleLike = e => {
        // console.log(this.getUrlVars()["recipe_id"])
        if  (document.getElementById("likeButton").style.color == "blue") {
            //deselect
            this.removeLikeFromDB().then(() =>{
                document.getElementById("likeButton").style.color = "gray";
            })
        } else {
            this.addLikeToDB().then(() => {
                document.getElementById("likeButton").style.color = "blue";
                document.getElementById("dislikeButton").style.color = "gray";
            })
        }
    }

    handleDislike = e => {
        if  (document.getElementById("dislikeButton").style.color == "red") {
            //deselect
            this.removeDislikeFromDB().then(() => {
                document.getElementById("dislikeButton").style.color = "gray";
            })
        } else {
            this.addDislikeToDB().then(() => {
                document.getElementById("dislikeButton").style.color = "red";
                document.getElementById("likeButton").style.color = "gray";
            })
        }
    }

    handleFavorite = e => {
        if (this.state.isRecipeFavorited) {
            this.removeRecipeFromFavorites().then(() => {
                this.setState({favoriteButtonText: "Add to Favorites"})
            })
            return
        }
        this.addRecipeToFavorites().then(() => {
            this.setState({favoriteButtonText: "Remove From Favorites"})
        })
    }

    handleSave = e => {
        const file = document.getElementById('imagePicker')
        if (file.files[0]) {
            uploadFile(file.files[0]).then(url => {
                this.setState({pictureLink: url})
                console.log(this.state.pictureLink)
    
                fetch(util.format('%s/api/recipe/editRecipe', process.env.REACT_APP_EXPRESS_BACKEND), {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                })
                .then(result => {
                    console.log(result) // 500 = Internal Service Error; 201 = CREATED
                    if (result.ok) {
                        // Handle successful recipe upload here
                        window.location = util.format('/recipe?recipe_id=%s', this.state.recipe_id)
                    }
                    // Handle non-successful recipe upload here
                })
            })
        } else {
            console.log(this.state.pictureLink)
            fetch(util.format('%s/api/recipe/editRecipe', process.env.REACT_APP_EXPRESS_BACKEND), {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(result => {
                console.log(result) // 500 = Internal Service Error; 201 = CREATED
                if (result.ok) {
                    // Handle successful recipe upload here
                    window.location = util.format('/recipe?recipe_id=%s', this.state.recipe_id)
                }
                // Handle non-successful recipe upload here
            })
        }

        if (this.state.addedIngredientData.length > 0) {
            this.addIngredientsToDB()
        }

        if (this.state.deletedIngredientData.length > 0) {
            this.removeIngredientsFromDB()
        }

        if (this.state.editedIngredientData.length > 0) {
            this.editDBIngredients()
        }

        if (this.state.addedInstructionData.length > 0) {
            this.addInstructionsToDB()
        }

        if (this.state.deletedInstructionData.length > 0) {
            this.removeInstructionsFromDB()
        }

        if (this.state.editedInstructionData.length > 0) {
            this.editDBInstructions()
        }
    }

    editRecipe = () => {
        return fetch(util.format('%s/api/recipe/editRecipe', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    addIngredientsToDB = () => {
        return fetch(util.format('%s/api/recipe/addIngredients', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    removeIngredientsFromDB = () => {
        return fetch(util.format('%s/api/recipe/delIngredients', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    editDBIngredients = () => {
        return fetch(util.format('%s/api/recipe/editIngredients', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    addInstructionsToDB = () => {
        return fetch(util.format('%s/api/recipe/addInstructions', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    removeInstructionsFromDB = () => {
        return fetch(util.format('%s/api/recipe/delInstructions', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    editDBInstructions = () => {
        return fetch(util.format('%s/api/recipe/editInstructions', process.env.REACT_APP_EXPRESS_BACKEND), {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(result => {
            console.log(result) // 500 = Internal Service Error; 201 = CREATED
            if (result.ok) {
                // Handle successful recipe upload here
                return
            }
            // Handle non-successful recipe upload here
        })
    }

    handleEdit = e => {
        document.getElementById("editMode").style.display = "block"
        document.getElementById("showMode").style.display = "none"
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
        const menuId = 'primary-search-account-menu';
        return (
            <div className="main">  
            <div className={classes.grow}>
            <AppBar position="static" id="appbar">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Delight
                        </Typography>
                        <Link to="/dashboard" id="menu-button">Home</Link>
                        <Link to="/personalRecipe" id="menu-button">Recipes</Link>
                        <Link to="/upload" id="menu-button">Upload</Link>
                        <Link to="/favorite" id="menu-button">Favorite</Link>
                        <Link to="/like" id="menu-button">Like</Link>
                        {/* <Button id="menu-button">
                            Marketplace
                        </Button> */}
    
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
    
                        </div>
                        <Link to="/profile" id="name">{this.state.userFullName}</Link>
                        <Link to="/login" id="name">Sign out</Link>
                    </Toolbar>
                </AppBar>
            </div>    
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
                                                const addedIngredientData = [...prevState.addedIngredientData]
                                                ingredientData.push(newData);
                                                addedIngredientData.push(newData)
                                                return { ...prevState, ingredientData, addedIngredientData };
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
                                                const editedIngredientData = [...prevState.editedIngredientData];
                                                editedIngredientData.push(newData)
                                                ingredientData[ingredientData.indexOf(oldData)] = newData;
                                                return { ...prevState, ingredientData, editedIngredientData };
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
                                                const deletedIngredientData = [...prevState.deletedIngredientData]
                                                ingredientData.splice(ingredientData.indexOf(oldData), 1);
                                                deletedIngredientData.push(oldData)
                                                return { ...prevState, ingredientData, deletedIngredientData };
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
                                                const addedInstructionData = [...prevState.addedInstructionData]
                                                instructionData.push(newData);
                                                addedInstructionData.push(newData)
                                                return { ...prevState, instructionData, addedInstructionData };
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
                                                const editedInstructionData = [...prevState.editedInstructionData]
                                                editedInstructionData.push(newData)
                                                instructionData[instructionData.indexOf(oldData)] = newData;
                                                return { ...prevState, instructionData, editedInstructionData };
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
                                                const deletedInstructionData = [...prevState.instructionData]
                                                deletedInstructionData.push(oldData)
                                                instructionData.splice(instructionData.indexOf(oldData), 1);
                                                return { ...prevState, instructionData, deletedInstructionData };
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
                                <Button id="cancelButton" 
                                        variant="contained" 
                                        color="primary" 
                                        // className={classes.button} 
                                        onClick={this.handleCancel}
                                        >
                                        Cancel
                                </Button>

                                <Button id="saveButton" 
                                        variant="contained" 
                                        color="primary" 
                                        className={classes.button} 
                                        onClick={this.handleSave}
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

                        <Button id="favoriteButton" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button} 
                            onClick={this.handleFavorite}
                            >
                            {this.state.favoriteButtonText}
                        </Button>
                    </div>
                </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7}>
                    <img src={this.state.pictureLink} alt="recipe" id="recipePic"></img>
                    {/* </img>className={classes.image} */}
                    
                </Grid> 
            </Grid> 
        </div>         
        )
    }
}

export default withStyles(styles)(Recipe)