import React, { useState, useEffect } from 'react'
import { Paper, Grid, FormControl, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import { useLocation } from 'wouter'
import { selectActiveAuth } from '../reducers/authReducer'
import { sendAuth } from '../actions/authAction'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({

    gridform: {
        margin: 'auto',
        minHeight: 'calc(100vh - 100px - 300px)',
        minWidth: '440px',
        maxWidth: '440px',
        marginBottom: '10%',
        marginTop: '10%'
    },
    paperform: {
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80'
    },
    title: {
        fontFamily: 'helvetica',
        fontSize: 20,
    },
    paragraph: {
        fontFamily: 'helvetica',
        fontSize: 13,
        color: '#777777',
        textAlign: 'left'
    },
}))

const mapStateToProps = state => {
    return {
        auth: selectActiveAuth(state),
    }
}

function Nothing({ auth }) {
    const [url, setUrl] = useState('')
    useEffect(() => {
        if (auth) {
            setUrl('/principal')
        } else {
            setUrl('/')
        }
        return () => {

        }
    }, [auth])
    const classes = useStyles()
    const [, navigate] = useLocation()

    return (
        <div>
            <Grid item className={classes.gridform} >
                <Paper className={classes.paperform} elevation={15}>
                    <FormControl>
                        <Typography className={classes.title}>
                            ¡Oops!. Error 404
                        </Typography>
                        <Typography className={classes.paragraph}>
                            Lamentablemente la dirección {window.location.pathname} no fue encontrada en nuestro servidor web.
                       </Typography>
                        <Grid container style={{ marginTop: '8px' }} wrap='nowrap' spacing={3}>
                            <Grid item xs zeroMinWidth>
                            </Grid>
                        </Grid>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            className={classes.button}
                            onClick={() => navigate(`${url}`)}
                            startIcon={<SubdirectoryArrowLeftIcon />}>
                            Volver al inicio
                        </Button>
                    </FormControl>
                </Paper>
            </Grid>
        </div>
    )
}
export default connect(mapStateToProps, { sendAuth })(Nothing)
