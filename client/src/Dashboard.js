import React from 'react';
import './Dashboard.css'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

//images
import food1 from './images/food1.jpg';
import food2 from './images/food2.jpg';
import food3 from './images/food3.jpg';
import food4 from './images/food4.jpeg';
import food5 from './images/food5.jpg';
import food6 from './images/food6.jpeg';
import {getUID} from './firebase/firebaseAuth'

const util = require('util');

const styles = theme => ({

    button: {
        color: 'white',
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: 'clear',
    },

    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },

    titleBar: {
        background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },

    grow: {
        flexGrow: 1,
    },

    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
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

    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },

    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
});

class Dashboard extends React.Component { 
    constructor(props) {
        super(props);
        
        this.state = {
            tileData: [
                {
                    img_url: "https://static.vibe.com/files/2017/02/Roll-Safe-1485964928-compressed.jpg",
                    name: 'Polenta',
                },
                {
                    img_url: food2,
                    name: 'Ossobuco',
                },
                {
                    img_url: food4,
                    name: 'Risotto',
                },
                {
                    img_url: food6,
                    name: 'Bottarga',
                },
                {
                    img_url: food5,
                    name: 'Fettuccine Alfredo',
                },
                {
                    img_url: food3,
                    name: 'Prohok',
                },
            ],
            anchorEl: null,
            setAnchorEl: null,
            mobileMoreAnchorEl: null,
            setMobileMoreAnchorEl: null,
            userFullName: ""
        }
    }

    handleCardClick = () => {
        window.location = '/recipe'
    }
    
    componentDidMount() {
        getUID().then(user => {
            fetch(util.format('%s/api/dashboard?uid=%s', process.env.REACT_APP_EXPRESS_BACKEND, user.uid), {
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
                    userFullName: util.format('%s %s', responseData.firstName, responseData.lastName),
                    tileData: responseData.allRecipes
                })
            })
        })
    }
    
    render() {
        // const [anchorEl, setAnchorEl] = React.useState(null);
        // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

        const isMenuOpen = Boolean(this.state.anchorEl);
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const handleProfileMenuOpen = event => {
            //setAnchorEl(event.currentTarget);
        };

        const handleMobileMenuClose = () => {
            this.state.setMobileMoreAnchorEl(null);
        };

        const handleMenuClose = () => {
            this.state.setAnchorEl(null);
            handleMobileMenuClose();
        };

        const handleMobileMenuOpen = event => {
            this.state.setMobileMoreAnchorEl(event.currentTarget);
        };

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
        <Menu
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
        <Menu
            anchorEl={this.state.mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
        <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
                <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                >
                <AccountCircle />
            </IconButton>
        <p>Profile</p>
        </MenuItem>
        </Menu>
        );
        const { classes } = this.props
        return(
            <div className = "main">
            <div className={classes.grow}>
                <AppBar position="static" id="appbar">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Delight
                        </Typography>
                        <Link to="/dashboard" id="menu-button">Home</Link>
                        <Link to="/personalRecipe" id="menu-button">Recipes</Link>
                        <Link to="/upload" id="menu-button">Upload</Link>
                        
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
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
    
                        </div>
                        <Link to="/profile" id="name">{this.state.userFullName}</Link>
                        <Link to="/login" id="name">Sign out</Link>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                                >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
    
                {renderMobileMenu}
                {renderMenu}
            </div>
    
            <div className = "titleView">
                <label id="title">Eat fresh Live Healthy</label>
                    <br/>
                <label id="subtitle">A Healthy Food For A Wealthy Mood!</label>
            </div>
    
            <div className={classes.root} id = "trending">
                <label id="category">Recommended</label>
                <GridList className={classes.gridList} cols={2.5}>
                    {this.state.tileData.map(tile => (
                    <GridListTile key={tile.img_url}>
                        <img src={tile.img_url} alt={tile.name} />
                        <GridListTileBar
                            id = "gridlist"
                            title={tile.name}
                            classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                        actionIcon={
                            // <IconButton aria-label={`star ${tile.title}`}>
                            //     <StarBorderIcon className={classes.title} />
                            // </IconButton>
                            <Button className={classes.button} onClick={this.handleCardClick}>View</Button>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
            </div> 
        </div>
        );   
        
    }
}

export default withStyles(styles)(Dashboard)