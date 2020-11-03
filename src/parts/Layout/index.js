import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core'
import styles from './styles';

const useStyles = makeStyles((theme) => ({
  buttonText: {
    fontWeight: 'bold'
  }
}))

const Layout = (props) => {
  const classes = useStyles();

  return(
    <>
      <AppBar>
        <Toolbar>
          <Typography variant='h4' style={{ flexGrow: 1 }}>Authority Documents</Typography>
          <Button variant="contained" color="secondary" className={classes.buttonText}>Save List</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <main className="main-content-body">
          { props.children }
        </main>
      </Container>
      <style jsx>{styles}</style>
    </>
  )
}

export default Layout;