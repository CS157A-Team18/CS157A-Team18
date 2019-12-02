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

// import color from '@material-ui/core/colors/red';

// class Recipe extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name : this.props.name,
//             image : this.props.image,
//             description : "Preheat oven to 350 degrees. In a bowl add the melted butter to the pecan halves and mix together with a spoon. Add the rub and sugar then mix well with spoon. Make sure that the pecans are fully covered. Lay the pecans onto a cooking sheet and bake for 15 mins. ",
//             quantity: [1,1,2,1],
//             measurement: ["tablespoon","tablespoon","cups","tablespoon"],
//             ingredients : ["Bad Byron's Butt Rub","Butter Melted", "Pecan Halves","Sugar"],
//             url : "https://www.youtube.com/watch?v=943loiK6M70"
//         };
//     }

//     render(){
//         return (
//             <div style={{position:'relative',textAlign:'center',background:'white',marginBottom:'30px', width:'100%',height:'100%'}}>
//                 <img src={this.state.image} style={{width:'660px', height:'400px',marginTop:'20px'}}></img>
//                 <h1 style={{marginTop:'13px',marginBottom: '10px'}}>{this.state.name}</h1>
//                 <div style={{textAlign: 'left',marginLeft:'390px',marginRight:'385px'}}>
//                     <div><b>Ingredients</b></div><br/>
//                     <div>
//                     {this.state.quantity.map((value, index) => {
//                         return <div>{`${this.state.quantity[index]} ${this.state.measurement[index]} ${this.state.ingredients[index]}`}</div>
//                     })}
//                     </div><br/>
//                     <div style={{marginBottom: '10px'}}><b>Instructions</b></div>
//                     {this.state.description}
//                 </div><br/>
//                 <a href={this.state.url} target="_blank">Click here for video tutorial</a>
//             </div>
//         );
//     }    
// }

// export default Recipe;

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
        margin: theme.spacing(3, 0, 2),
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

  class Recipe extends React.Component { 
    //const classes = styles();

    constructor(props) {
        super(props);
        
        this.state = {
            likes: 15
        }
    }

    handleLike = e => {
        document.getElementById("likeButton").style.color = "blue";
        document.getElementById("dislikeButton").style.color = "gray";
    }

    handleDislike = e => {
        document.getElementById("dislikeButton").style.color = "red";
        document.getElementById("likeButton").style.color = "gray";
    }

    render() { 
        const { classes } = this.props
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
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
                                //value={value}
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
                        <div className={classes.section}>
                            <label id ="titleLabel">Number of Likes: {this.state.likes}</label>
                        </div>
                        <IconButton id="likeButton" onClick = {this.handleLike} aria-label="like">
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton id = "dislikeButton" onClick = {this.handleDislike} aria-label="dislike">
                            <ThumbDownIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />  
            </Grid>      
        )
    }
}

export default withStyles(styles)(Recipe)