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
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import {getUID} from './firebase/firebaseAuth'

const util = require('util');

const styles = theme => ({
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
          userFullName: ""
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
              recipeData: responseData,
              userFullName: util.format('%s %s', responseData.firstName, responseData.lastName)
            })
        })
      })
    }
    
    render() {

      const { classes } = this.props

      const menuId = 'primary-search-account-menu';
      //const { classes } = this.props
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
      </div>
      );
    }
  }

  export default withStyles(styles)(LikeRecipe);

