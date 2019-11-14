import React, { Component } from 'react'
import color from '@material-ui/core/colors/red';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            image : this.props.image,
            description : "Preheat oven to 350 degrees. In a bowl add the melted butter to the pecan halves and mix together with a spoon. Add the rub and sugar then mix well with spoon. Make sure that the pecans are fully covered. Lay the pecans onto a cooking sheet and bake for 15 mins. ",
            quantity: [1,1,2,1],
            measurement: ["tablespoon","tablespoon","cups","tablespoon"],
            ingredients : ["Bad Byron's Butt Rub","Butter Melted", "Pecan Halves","Sugar"],
            url : "https://www.youtube.com/watch?v=943loiK6M70"
        };
    }

    render(){
        return (
            <div style={{position:'relative',textAlign:'center',background:'white',marginBottom:'30px', width:'100%',height:'100%'}}>
                <img src={this.state.image} style={{width:'660px', height:'400px',marginTop:'20px'}}></img>
                <h1 style={{marginTop:'13px',marginBottom: '10px'}}>{this.state.name}</h1>
                <div style={{textAlign: 'left',marginLeft:'390px',marginRight:'385px'}}>
                    <div><b>Ingredients</b></div><br/>
                    <div>
                    {this.state.quantity.map((value, index) => {
                        return <div>{`${this.state.quantity[index]} ${this.state.measurement[index]} ${this.state.ingredients[index]}`}</div>
                    })}
                    </div><br/>
                    <div style={{marginBottom: '10px'}}><b>Instructions</b></div>
                    {this.state.description}
                </div><br/>
                <a href={this.state.url} target="_blank">Click here for video tutorial</a>
            </div>
        );
    }    
}

export default Recipe;