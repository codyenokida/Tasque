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
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left'
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
    margin: '10px 20px 10px 0',
    textTransform: 'none'
  },
}))(Button);

const SignUpButton = withStyles(() => ({
  root: {
    color: 'white',
    border: '1px solid',
    borderColor: 'white',
    margin: '10px 20px 10px 0',
    textTransform: 'none'
  },
}))(Button);


const Home = props => {
  //const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  //console.log(user);
  //console.log(isAuthenticated);
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState({username: "", password : ""});
  const [message, setMessage] = useState(null);
  let timeID = useRef(null);

  useEffect(() => {
      return () => {
          clearTimeout(timeID);
      }
  }, []);

  const handleChange = e => {
    e.preventDefault();
    setUser({...user,[e.target.name] : e.target.value});
  }

  const onSubmitLogin = e =>{
    e.preventDefault();
    AuthService.login(user).then(data=>{
        const { isAuthenticated, user, message} = data;
        if(isAuthenticated){
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            props.history.push('/todo')
        }
        else
            setMessage(message);
    });
  }

  const onSubmitSignUp = e =>{
    e.preventDefault();
    AuthService.register(user).then(data => {
        const { message } = data;
        setMessage(message);
        if (!message.msgError) {
            timeID = setTimeout(() => {
                props.history.push('/todo');
            }, 2000);
        } 
    });
  }

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
                <div>
                    <h1 style={{fontSize: '3.5rem', marginBottom: '10px'}}>This is <span style={{color: '#EDB57B'}}>Tasque.</span></h1>
                    <h3 style={{color: '#C4C4C4', fontWeight: 100}}>Welcome back! Pleae sign in to your account.</h3>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        style={{ margin: "10px 0 10px 0" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                root: classes.label,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.inputBaseRoot,
                                underline: classes.underline,
                            }
                        }}
                        value={user.username}
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Password"
                        style={{ margin: "10px 0 10px 0" }}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                            classes: {
                                root: classes.label,
                            },
                        }}
                        InputProps={{
                            classes: {
                                root: classes.inputBaseRoot,
                                underline: classes.underline,
                            }
                        }}
                        value={user.password}
                        onChange={handleChange}
                    />
                    <div className={classes.buttonContainer}>
                        <LoginButton 
                            size="large"
                            onClick={onSubmitLogin}>
                            Login
                        </LoginButton>
                        <SignUpButton 
                            size="large"
                            onClick={onSubmitSignUp}>
                            Sign Up
                        </SignUpButton>
                    </div>
            </div>
            </Grid>
            <Grid 
                xs={12} sm={6}
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Paper 
                className={classes.paper}>
                    <div style={{padding: 50}}>
                        <h1 style={{color: '#262B3F'}}>How does <span style={{color: '#EDB57B'}}>Tasque</span> work?</h1>
                        <p><span style={{color: '#EDB57B'}}>Tasque</span> is a simple task manager! Start your own personalized workspace and keep track of tasks. Being by creating a category and then creating a task.</p>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </div>
  );
}

export default Home;
