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

  class LikeRecipe extends React.Component {
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
        fetch(util.format('%s/api/likes?uid=%s', process.env.REACT_APP_EXPRESS_BACKEND, user.uid), {
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
    
    render() {
      //const { classes } = this.props
      return (
        <div className="table">
            <MaterialTable
                icons={tableIcons}
                title="Like recipes"
                columns={this.state.columns}
                detailPanel={event => {
                  window.location = util.format('/recipe?recipe_id=%s', event.id);
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                data={this.state.recipeData}
                options={{
                    search: false
                }}
            />
        </div>
      );
    }
  }

  export default LikeRecipe;

