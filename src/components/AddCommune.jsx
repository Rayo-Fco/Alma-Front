import React, { useState, useEffect } from 'react'
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import useAddCommunes from '../hooks/useAddCommunes'
import { useLocation } from 'wouter'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import Alert from '@material-ui/lab/Alert'

const usesStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        height: 'auto',
        width: '65%',
    },
    grdC: {
        margin: 'auto',
        width: '85%',
        marginTop: 10
    },
    input: {
        marginTop: theme.spacing(1)
    },
    typ: {
        fontSize: 30,
        fontFamily: 'Arial',
        paddingBottom:20
    },
    cntainer: {
        paddingTop: 10
    },
    progress: {
        height: '90vh',
        paddingTop: '20%'
    },
    circular: {
        color: '#fd9eef'
    },
    alert: {
        textAlign:'left'
    }
}))


function AddCommune() {
    const { addcommunes, isAddLoading, hasAddError, errorMsj, succeedAdd } = useAddCommunes()
    const [commune, setCommune] = useState('')
    const [phone, setPhone] = useState('')
    const [, navigate] = useLocation()
    const [coordinates, setCoordinates] = useState([
        { latitude: '', longitude: '' }
    ])

    const classes = usesStyles()

    const handleSubmit = () => {
        addcommunes({ commune, phone, coordinates })
    }

    useEffect(() => {
        const ac = new AbortController()
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        }
        return () => ac.abort()
    }, [navigate])

    const handleChange = (e, index) => {
        const { name, value } = e.target
        const list = [...coordinates]
        list[index][name] = value
        setCoordinates(list)
    }

    const handleAddInput = () => {
        setCoordinates([...coordinates, { latitude: '', longitude: '' }])
    }

    const handleRemoveInput = index => {
        const list = [...coordinates]
        list.splice(index, 1)
        setCoordinates(list)
    }

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }

    return (
        <>
            {isAddLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isAddLoading &&
                <Paper className={classes.container} elevation={15}>
                    <Grid className={classes.cntainer} item xs={12}>
                        <Typography className={classes.typ} color='primary'>
                            Registro de Comuna
                    </Typography>
                        {hasAddError &&
                            <Alert className={classes.alert} variant='filled' severity='error'>
                                {errorMsj.map(error => {
                                    return (
                                        <div key={error}>
                                            *{error} <br />
                                        </div>
                                    )
                                })}
                            </Alert>}
                        {succeedAdd &&
                            <Alert className={classes.alert} variant='filled' severity='success'>
                                Se ha registrado con éxito
                            </Alert>
                        }
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.grdC} onKeyPress={(e) => onKeyUpValue(e)}>
                            <TextField
                                className={classes.input}
                                label='Nombre comuna'
                                variant='outlined'
                                onChange={(e) => setCommune(e.target.value)}
                            />
                            <TextField
                                type='number'
                                className={classes.input}
                                label='Telefono'
                                variant='outlined'
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {coordinates.map((item, i) => {
                                return (
                                    <div key={i} style={{ margin: 'auto', width: '100%' }}>
                                        <TextField
                                            name='latitude'
                                            style={{ width: '40%', marginRight: '10px', float: 'left' }}
                                            className={classes.input}
                                            label='Latitud'
                                            variant='outlined'
                                            value={item.latitude}
                                            onChange={e => handleChange(e, i)}
                                        />
                                        <TextField
                                            name='longitude'
                                            style={{ width: '40%', marginRight: '10px', float: 'left' }}
                                            className={classes.input}
                                            label='Longitud'
                                            variant='outlined'
                                            value={item.longitude}
                                            onChange={e => handleChange(e, i)}
                                        />
                                        <div style={{ paddingTop: '10px' }}>
                                            {coordinates.length - 1 === i &&
                                                <IconButton aria-label='Agregar' className={classes.margin} onClick={handleAddInput} style={{ float: 'left' }}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            }
                                            {coordinates.length !== 1 &&
                                                <IconButton aria-label='Eliminar' className={classes.margin} onClick={() => handleRemoveInput(i)} style={{ float: 'left' }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        </div>

                                    </div>
                                )
                            })}
                            <Button
                                variant='contained'
                                className={classes.input}
                                color='primary'
                                startIcon={<SaveIcon />}
                                onClick={() => handleSubmit()}
                            >
                                Registrar
                </Button>
                        </FormControl>
                    </Grid>
                </Paper>
            }
            <div style={{ height: '150px' }}>
            </div>
        </>
    )
}

export default AddCommune
