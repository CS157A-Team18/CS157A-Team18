import React, { Component } from 'react'
import color from '@material-ui/core/colors/red';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.Name,
            image : this.props.Image,
            description : "Preheat oven to 350 degrees. In a bowl add the melted butter to the pecan halves and mix together with a spoon. Add the rub and sugar then mix well with spoon. Make sure that the pecans are fully covered. Lay the pecans onto a cooking sheet and bake for 15 mins. ",
            quantity: [1,1,2,1],
            measurement: ["tablespoon","tablespoon","cups","tablespoon"],
            ingredients : ["Bad Byron's Butt Rub","Butter Melted", "Pecan Halves","Sugar"],
            url : "https://www.youtube.com/watch?v=943loiK6M70"
        };
        this.handleOnClick=this.handleOnClick.bind(this);
    }
        
    handleOnClick(){
        console.log("hi");
    }

    ingredientList(){
        var i;
        // for(i = 0; i < quantity.length; i++){
        //     <p>{this.state.quantity[i]} {this.state.measurement[i]} {this.state.ingredients[i]}</p>
        // }
    }

    render(){
        return (
            <div style={{position:'relative',textAlign:'center',background:'white',marginBottom:'30px', width:'100%',height:'100%'}}>
                <img src={this.state.image} style={{width:'660px', height:'400px',marginTop:'20px'}}></img>
                <h1 style={{marginTop:'13px',marginBottom: '10px'}}>{this.state.name}</h1>
                <p style={{textAlign: 'left',marginLeft:'390px',marginRight:'385px'}}>
                    {this.ingredientList()}
                    <p><b>Ingredients</b></p>
                    <p>{this.state.quantity[0]} {this.state.measurement[0]} {this.state.ingredients[0]}</p>
                    <p>{this.state.quantity[1]} {this.state.measurement[1]} {this.state.ingredients[1]}</p>
                    <p>{this.state.quantity[2]} {this.state.measurement[2]} {this.state.ingredients[2]}</p>
                    <p>{this.state.quantity[3]} {this.state.measurement[3]} {this.state.ingredients[3]}</p>
                    <p style={{marginBottom: '10px'}}><b>Instructions</b></p>
                    {this.state.description}
                </p>
                <a href={this.state.url} target="_blank">Click here for video tutorial</a>
                {/* <button onClick={this.handleOnClick}>Click me</button> */}
            </div>
            
        );
    }    
}

export default Recipe;