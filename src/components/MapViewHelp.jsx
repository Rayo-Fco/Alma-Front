import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers'
import LocateControl from './LocateControl';
import axios from 'axios'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconLocation'

function MapViewHelp(props) {
    const helptoken = props.params.helpToken 
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    })
    const [state2, setState2] = useState({
        currentLocation: {
            "person": [
                0, 0
            ]
        },
        zoom: 23
    })

    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source();
        const token = ''
        console.log(helptoken)
        axios.get('http://localhost:3001/help', {
            headers: { Authorization: "Bearer " + token },
            cancelToken: source.token,
        })
            .then(res => {
                if (isMounted) {
                    setState({
                        longitude: res.data.longitude,
                        latitude: res.data.latitude
                    })
                    if (state.latitude && state.longitude) {
                        const currentLocation = {
                            "person": [
                                state.latitude,
                                state.longitude
                            ]
                        }
                        setState2({ currentLocation })
                    }
                }
            }).catch(function (e) {
                if (isMounted) {
                    if (axios.isCancel(e)) {
                    }
                }
            })
        return function () {
            isMounted = false;
        }

    }, [state, helptoken]);

    return (
        <div style={{ height: '100vh' }}>
            <Map center={state2.currentLocation.person} zoom={state2.zoom} style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Markers />
                <Marker
                    position={state2.currentLocation.person}
                    icon={IconLocation}>
                    <Popup>
                        Aqui esta
                </Popup>
                </Marker>
                <LocateControl startDirectly />

            </Map>
        </div>
    )
}

export default MapViewHelp
