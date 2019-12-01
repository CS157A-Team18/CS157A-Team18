import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './Upload.css'
import TextField from '@material-ui/core/TextField';
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
import {uploadFile} from './firebase/firebaseStorage.js'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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

const styles = theme => ({
    paper: {
        margin: theme.spacing(15, 8),
        padding: '2%',
        isplay: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //textAlign: 'center',
        backgroundColor: 'white',
    },
    section: {
        margin: theme.spacing(5, 0, 5, 0),
    },
    textarea: {
        height: '500px',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 500,
    },
});

const handleSubmit = () => {
    const file = document.getElementById('imagePicker')
    uploadFile(file.files[0])
}

class Upload extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

            uid: "",
            recipeName: "",
            mealTypeArray: ["breakfast", "lunch", "dinner"],
            vidURL: "",
            picURL: "",

            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Amount', field: 'amount'},
                { title: 'Measurement', field: 'measurement'}
            ],
            instructionColumns: [
                { title: 'Steps', field: 'description' },
            ],
            data: [
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

    componentDidMount = () => {
        
    }

    render() { 
        const { classes } = this.props
        return (
            <div className={classes.paper}>
                <label id="question">Create a new recipe</label>
                
                <div className={classes.section}>
                    <label id ="titleLabel">Recipe name:</label>
                    <TextField
                        id="recipeName"
                        label="Type in your recipe name"
                        margin="dense"
                        fullWidth
                    />
                </div>

                <label id ="titleLabel">MealType:</label>
                <div className={classes.section}>
                    <Grid className={classes.button}>
                        <ButtonGroup fullWidth aria-label="full width outlined button group">
                            <Button> {this.state.mealTypeArray[0]} </Button>
                            <Button>{this.state.mealTypeArray[1]}</Button>
                            <Button>{this.state.mealTypeArray[2]}</Button>
                        </ButtonGroup>
                    </Grid>
                </div>

                <label id ="titleLabel">Ingredients:</label>
                <div className={classes.section}>
                    <MaterialTable className={classes.table}
                        icons={tableIcons}
                        title=""
                        columns={this.state.columns}
                        data={this.state.data}
                        editable={{
                            onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                                }, 600);
                            }),
                            onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                    });
                                }
                                }, 600);
                            }),
                            onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                this.setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
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
                {/* <div>
                    <br/>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Tell us the process"
                        multiline
                        rowsMax="4"
                        //value={value}
                        //onChange={handleChange}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                </div> */}
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
                    <Button id="submitButton" 
                            variant="contained" 
                            color="primary" 
                            // className={classes.button} 
                            onClick={handleSubmit}
                            >
                            Add Recipe
                    </Button>
                </div>
            </div>
    );
    }
}

export default withStyles(styles)(Upload)