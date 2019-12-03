import React from 'react';
import MaterialTable from 'material-table';
import './PersonalRecipe.css'
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
import { Link } from "react-router-dom";
import {getUID} from './firebase/firebaseAuth'

const util = require('util');

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
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
};

// export default function PersonalRecipe() {
//   const [state, setState] = React.useState({
//     columns: [
//       { title: 'Food', field: 'name' },
//       // { title: 'Price', field: 'birthYear', type: 'numeric' },
//     ],
//     data: [
//       { name: 'Banh mi', birthYear: 1987 },
//       {
//         name: 'Pho',
//         birthYear: 2017
//       },
//     ],
//   });

  class PersonalRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
          columns: [
            { title: 'Food', field: 'name' },
            { title: 'Likes', field: 'likes' },
            { title: 'Dislikes', field: 'dislikes' },
          ],
          recipeData: [],
        }
    }

    componentDidMount() {
      getUID().then(user => {
        fetch(util.format('%s/api/personalRecipe?uid=%s', process.env.REACT_APP_EXPRESS_BACKEND, user.uid), {
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
              recipeData: responseData
          })
      })
      })
    }

    handleDeleteFromDB = data => {
      fetch(util.format('%s/api/personalRecipe', process.env.REACT_APP_EXPRESS_BACKEND), {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(result => {
        console.log(result) // 500 = Internal Service Error; 201 = CREATED
        if (result.ok) {
            // Handle successful recipe delete here
            return
        }
        // Handle non-successful recipe delete here
      })
    }
    
    render() {
      //const { classes } = this.props
      return (
        <div className="table">
            <MaterialTable
                icons={tableIcons}
                title="Your recipes"
                columns={this.state.columns}
                detailPanel={event => {
                  window.location = util.format('/recipe?recipe_id=%s', event.id);
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                data={this.state.recipeData}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                      setTimeout(() => {
                      resolve();
                      if (oldData) {
                        this.setState(prevState => {
                          const recipeData = [...prevState.recipeData];
                          recipeData[recipeData.indexOf(oldData)] = newData;
                          return { ...prevState, recipeData };
                        });
                      }
                      }, 600);
                    }),
                    onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        this.setState(prevState => {
                            const recipeData = [...prevState.recipeData];
                            recipeData.splice(recipeData.indexOf(oldData), 1);
                            return { ...prevState, recipeData };
                        });
                        this.handleDeleteFromDB(oldData)
                        }, 600);
                    }),
                }}
                options={{
                    search: false
                }}
            />
        </div>
      );
    }
  }

  export default PersonalRecipe;
  
//}

