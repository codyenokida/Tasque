import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import CategoryServices from '../../Services/CategoryServices';
import AuthServices from '../../Services/AuthServices';
import { makeStyles, Paper, Grid, Fab } from '@material-ui/core';
import { Add, ExitToApp } from '@material-ui/icons/';

import Modal from '../Modal/Modal'

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
    width: '70%',
    height: '80%',
    padding: 50,
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
  },
  categoryButton: { 
    maxWidth: '80%',
    width: '100px',
    height: '100px', 
    position: 'relative',
    background:'linear-gradient(0deg, rgba(226,131,108,1) 0%, rgba(237,181,123,1) 100%)', 
    borderRadius: 20,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:after': {
        content: '',
        display: 'block',
        paddingTop: '100%' 
    },
    '&:hover': {
        opacity: 0.8
    }
  },
  logoutImage: {
      position: 'absolute',
      width: '50px',
      top: 0,
      fill: 'white',
      margin: '20px 0 0 20px',
      cursor: 'pointer',
      '&:hover': {
          opacity: 0.8
      }
  },
  todoContainer: {
      display: 'block',
      textAlign: 'left'
  },
  categoryTitleContainer: {
      display: 'flex',
      flexDirection: 'row'
  },
  addIcon: {
      marginLeft: 'auto',
      order: '2'
  }
}));

const CategoryButton = ({num, title, onClick}) => {

    const classes = useStyles();

    return (
        <Grid 
            item 
            container 
            direction="column"
            xs={6} sm={4}>
            <div className={classes.categoryButton} onClick={onClick}>
                <h1>{num}</h1>
            </div>
            <p style={{fontSize: '0.75rem', textAlign: 'center', maxWidth: '100px'}}>{title}</p>
        </Grid>
    );
}

const Dashboard = props => {
    const [categories, setCategories] = useState([]);
    const [todos, setTodos] = useState([{todo: "", index: 0}]);
    const [currentCategory, setCurrentCategory] = useState({name: "", index: -1});
    const [showModal, setShowModal] = useState(true);
    const [value, setValue] = useState(false);
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const classes = useStyles();

    useEffect(() => {
        CategoryServices.getCategories().then(data => {
            setCategories(data.categories);
        }, []);
    }, []);

    const getTodo = index => {
        CategoryServices.getTodos(index).then(data => {
            setTodos(data.todos)
        }, []);
    }

    const logOut = () => {
        AuthServices.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
                props.history.push('/');
            }
        });
    }

    const toggleModal = e => {
        setShowModal(!showModal);
    }

    return (
        user.username !== "" ? 
        <div className={classes.root}>
            <Grid container>
                <ExitToApp className={classes.logoutImage} onClick={() => logOut()}/>
                <Grid 
                    xs={12} sm={6}
                    container
                    item
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="flex-start"
                    style={{ minHeight: '100vh' }}>
                        <div style={{width: '70%', height: '60%', marginTop: '20%'}}>
                            <h1 style={{fontSize: '3rem'}}>Hey, { user.username }!</h1>
                            <p style={{color: '#C4C4C4', fontWeight: 100}}>Welcome back to your workplace, we missed you!</p>
                            <h2>Tasks</h2>
                            <Grid 
                                item 
                                container
                                spacing={0}
                                alignItems="center"
                                justify="flex-start">
                                { categories ?
                                categories.map((category, index) => {
                                    return <CategoryButton num={category.todos.length} title={category.name} key={index} onClick={() => {setCurrentCategory({name: category.name, index: index}); getTodo(index)}}/>
                                })
                                :
                                <p></p>
                                }
                            </Grid>
                        </div>
                </Grid>
                <Grid 
                    xs={12} sm={6}
                    container
                    item
                    spacing={0}
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Paper className={classes.paper}>
                        <div className={classes.todoContainer}>
                            {
                                currentCategory !== "" ? 
                                <div className={classes.categoryTitleContainer}>
                                    <h1 style={{color: '#262B3F'}}>{currentCategory.name}</h1> 
                                    <Fab color="primary" aria-label="add" className={classes.addIcon} onClick={() => toggleModal()}>
                                        <Add />
                                    </Fab>
                                </div>
                                :
                                null
                            }
                            
                            <hr/>
                            { todos ?
                                todos.map((todo, index) => {
                                    return <p key={index}>{todo.todo}</p>
                                })
                                :
                                <p></p>
                            }
                        </div>
                    </Paper>
                </Grid>
                <Modal onClose={() => toggleModal()} show={showModal} index={currentCategory.index}>
                </Modal>
            </Grid>
            
        </div>
        :
        <h1>Pleae Log in</h1>
    );
}

export default Dashboard;
