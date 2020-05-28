import React, { useState } from "react";
import CategoryServices from '../../Services/CategoryServices'
import { Paper, makeStyles, Fab, TextField, withStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '70%',
        height: '50%',
        padding: 30,
        borderRadius: '30px'
    }, 
    wrapper: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#171923',
        opacity: 1,
        position: 'absolute',
        zIndex: 100,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    closeIcon: {
        marginLeft: 'auto',
        order: '2',
    }
}));

const SubmitButton = withStyles(() => ({
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

const Modal = props => {

    const [todo, setTodo] = useState({todo: "", index: props.index});

    const handleChange = e => {
        e.preventDefault();
        setTodo({todo: e.target.value, index: props.index});
    }

    const onClose = e => {
        props.onClose && props.onClose(e);
    }

    const onSubmit = e =>{
        e.preventDefault();
        if (todo.todo !== "") {
            CategoryServices.postTodo(todo).then(data => {
                console.log(data)
            });
        }
        onClose(); 
    }

    const classes = useStyles();

    return(
        !props.show ?
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <div className={classes.titleContainer}>
                    <h2 style={{color: '#262B3F'}}>Create a New Task!</h2>
                    <Fab color="primary" size="small" aria-label="close" className={classes.closeIcon} onClick={() => onClose()}>
                        <CloseIcon />
                    </Fab>
                </div>
                <div>
                    <TextField
                        id="todo"
                        name="todo"
                        label="Todo"
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
                        value={todo.todo}
                        onChange={handleChange}
                    />
                </div>
                <SubmitButton 
                    size="large"
                    onClick={onSubmit}>
                    Submit
                </SubmitButton>
            </Paper>
        </div>
        :
        null
    );
}

export default Modal;