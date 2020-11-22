import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers'
import LocateControl from './LocateControl';
import axios from 'axios'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import { IconLocation } from './IconLocation'

function MapViewHelp(props) {
    const helprut = props.params.helpRut
    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [state2, setState2] = useState({
        currentLocation: {
            "person": [
                0, 0
            ]
        },
        zoom: 23
    })

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(`http://localhost:3001/gethelp?token=${helprut}`, {
                cancelToken: source.token,
            })
                .then(res => {
                    if (isMounted) {
                        console.log(res.data)
                        const currentLocation = {
                            "person": [
                                res.data.coordinates[res.data.coordinates.length - 1].latitude,
                                res.data.coordinates[res.data.coordinates.length - 1].longitude
                            ]

                        }
                        const datelatin = res.data.coordinates[res.data.coordinates.length - 1].date.split("T")[0].split('-').reverse().join('/');
                        setDate(datelatin)
                        setHour(res.data.coordinates[res.data.coordinates.length - 1].date.split("T")[1].split("7Z")[0].split(".")[0])
                        setUser(res.data.user[0])
                        setState2({ currentLocation })

                    }
                }).catch(function (e) {
                    console.log("entra");
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })
        }, 300000);

        let isMounted = true
        let source = axios.CancelToken.source();
        console.log('llega');
        axios.get(`http://localhost:3001/gethelp?token=${helprut}`, {
            cancelToken: source.token,
        })
            .then(res => {

                if (isMounted) {
                    console.log('pasa');
                    console.log(res.data)
                    const currentLocation = {
                        "person": [
                            res.data.coordinates[res.data.coordinates.length - 1].latitude,
                            res.data.coordinates[res.data.coordinates.length - 1].longitude
                        ]

                    }
                    const datelatin = res.data.coordinates[res.data.coordinates.length - 1].date.split("T")[0].split('-').reverse().join('/');

                    setDate(datelatin)
                    setHour(res.data.coordinates[res.data.coordinates.length - 1].date.split("T")[1].split("7Z")[0].split(".")[0])
                    setUser(res.data.user[0])
                    setState2({ currentLocation })

                }
            }).catch(function (e) {

                if (isMounted) {
                    console.log('pasa');

                    if (axios.isCancel(e)) {

                    }
                }
            })
        return function () {
            isMounted = false;
            clearInterval(interval);
        }

    }, [helprut]);

    return (
        <div style={{ height: '100vh' }}>
            <Map center={state2.currentLocation.person} zoom={state2.zoom} style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Markers />
                <Marker
                    position={state2.currentLocation.person}
                    icon={IconLocation}>
                    <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                        Su ultimo punto cuando apreto SOS <br />
                        Fecha: {date} <br />
                        Hora: {hour}
                    </Tooltip>
                    <Popup>
                        Aqui esta {user.nombre}
                    </Popup>
                </Marker>
                <LocateControl startDirectly />

            </Map>
        </div>
    )
}

export default MapViewHelp
