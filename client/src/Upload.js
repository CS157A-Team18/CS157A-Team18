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
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
};

const styles = makeStyles(theme => ({
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
}));

export default function Upload() {

    const [state, setState] = React.useState({
        columns: [
          { title: 'Name', field: 'name' },
          { title: 'Amount', field: 'amount' },
        ],
        data: [
          { name: 'Soy sauce', amount: 63 },
          {
            name: 'Sugar',
            amount:90
          },
        ],
      });

    const classes = styles();
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

                <label id ="titleLabel">Ingredients:</label>
                <div className={classes.section}>
                    <MaterialTable className={classes.table}
                        icons={tableIcons}
                        title=""
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                resolve();
                                setState(prevState => {
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
                                    setState(prevState => {
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
                                setState(prevState => {
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

                <label id ="titleLabel">Description:</label>
                <div>
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
                </div>
            </div>
    );
} 