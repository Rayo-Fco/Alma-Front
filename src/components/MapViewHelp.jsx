import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import LocateControl from './LocateControl'
import axios from 'axios'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { IconLocation } from './IconLocation'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'wouter'
import api from '../services/api'

const useStyles = makeStyles((theme) => ({
    progress: {
        height: '80%',
        width: '80%',
        paddingTop: '30%',
        paddingLeft: '15%'

    },
    circular: {
        color: '#fd9eef'
    },
}))



function MapViewHelp(props) {
    const classes = useStyles();
    const helptoken = props.params.helpToken
    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [, navigate] = useLocation()
    const [state2, setState2] = useState({
        currentLocation: {
            "person": [
                0, 0
            ]
        },
    })

    useEffect(() => {
        window.scrollTo(0,0)
        const interval = setInterval(() => {
            api.get(`/gethelp?token=${helptoken}`, {
                cancelToken: source.token,
            })
                .then(res => {
                    if (isMounted) {
                        const currentLocation = {
                            "person": [
                                res.data.coordinates[res.data.coordinates.length - 1].latitude,
                                res.data.coordinates[res.data.coordinates.length - 1].longitude
                            ]

                        }
                        setHour(new Date(res.data.coordinates[res.data.coordinates.length - 1].date).toLocaleTimeString())
                        setDate(new Date(res.data.coordinates[res.data.coordinates.length - 1].date).toLocaleDateString())
                        setUser(res.data.user[0])
                        setState2({ currentLocation })
                        setIsLoading(false)

                    }
                }).catch(function (e) {
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })
        }, 300000);

        let isMounted = true
        let source = axios.CancelToken.source();
        api.get(`/gethelp?token=${helptoken}`, {
            cancelToken: source.token,
        })
            .then(res => {

                if (isMounted) {
                    const currentLocation = {
                        "person": [
                            res.data.coordinates[res.data.coordinates.length - 1].latitude,
                            res.data.coordinates[res.data.coordinates.length - 1].longitude
                        ]

                    }
                    setHour(new Date(res.data.coordinates[res.data.coordinates.length - 1].date).toLocaleTimeString())
                    setDate(new Date(res.data.coordinates[res.data.coordinates.length - 1].date).toLocaleDateString())
                    setUser(res.data.user[0])
                    setState2({ currentLocation })
                    setIsLoading(false)

                }
            }).catch(function (e) {

                if (isMounted) {
                    navigate('/needhelp')
                    if (axios.isCancel(e)) {

                    }
                }
            })
        return function () {
            isMounted = false;
            clearInterval(interval);
        }

    }, [helptoken, navigate]);

    return (
        <>
            {isLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
                </div>
            }
            {!isLoading &&
                <div style={{ height: '100vh' }}>
                    <Map center={state2.currentLocation.person} zoom="23" style={{ width: '100%', height: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                        <Marker
                            position={state2.currentLocation.person}
                            icon={IconLocation}>
                            <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                                Su ultimo punto cuando apreto SOS <br />
                                Hora: {hour}<br />
                                Fecha: {date}
                            </Tooltip>
                            <Popup>
                                Aqui esta {user.nombre}
                            </Popup>
                        </Marker>
                        <LocateControl startDirectly />

                    </Map>
                </div>
            }
        </>
    )
}

export default MapViewHelp
