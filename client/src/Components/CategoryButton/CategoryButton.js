import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  categoryButton: { 
    maxWidth: '80%', 
    position: 'relative',
    background:'linear-gradient(0deg, rgba(226,131,108,1) 0%, rgba(237,181,123,1) 100%)', 
    borderRadius: 20,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
        content: '',
        display: 'block',
        paddingTop: '100%' 
    }
  },
}));

const CategoryButton = ({num, title}) => {

    const classes = useStyles();

    return (
        <Grid 
            container 
            direction="column"
            xs={4}
            alignItems="center"
            justify="center">
            <div className={classes.categoryButton}>
                <h1>{num}</h1>
            </div>
            <p style={{fontSize: '0.75rem', textAlign: 'center'}}>{title}</p>
        </Grid>
    );
}

export default CategoryButton