import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import AuthService from '../../Services/AuthServices'
import { makeStyles, withStyles, Paper, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#262B3F',
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden'
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '90%',
    height: '90%',
    padding: 20,
    borderRadius: '30px'
  }, 
  label: {
    color: '#EDB57B'
  },
  inputBaseRoot: {
    color: 'white',
  },
  underline: {
    '&:before': {
      borderColor: '#EDB57B'
    },
    ':hover:not(.Mui-disabled):before': {
      borderColor: '#EDB57B'
    }
  },
  buttonContainer: {
    display: 'flex'
  }
}));

const LoginButton = withStyles(() => ({
  root: {
    color: 'white',
    backgroundColor: 'rgb(226,131,108)',
    '&:hover': {
      backgroundColor: 'rgb(226,131,108)',
    },
    marginRight: '20px',
    textTransform: 'none'
  },
}))(Button);

const SignUpButton = withStyles(() => ({
  root: {
    color: 'white',
    border: '1px solid',
    borderColor: 'white',
    marginRight: '20px',
    textTransform: 'none'
  },
}))(Button);


const Todo = props => {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const [user, setUser] = useState({username: "", password : ""});
 
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid 
          xs={12} sm={6}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
              <h1>Hello, {authContext.user.username}</h1>
        </Grid>
        <Grid 
          xs={12} sm={6}
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Todo;
