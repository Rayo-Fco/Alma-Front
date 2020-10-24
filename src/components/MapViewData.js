import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { sendCommunes } from '../actions/communesAction'
import { connect } from "react-redux";
import { selectActiveCommunes } from '../reducers/communesReducer'
import { IconPin } from './IconLocation'

const mapStateToProps = state => {
    return {
        communes: selectActiveCommunes(state)
    }
}

function MapViewData({ communes }) {
    const [count, setCount] = useState({ c: 0 })
    const [communeName, SetCommuneName] = useState('')
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    })
    const [state2, setState2] = useState({
        currentLocation: { lat: 0, lng: 0 },
        zoom: 15
    })


    useEffect(() => {
        let currentLocation = {
            lat: 0,
            lng: 0
        }
        if (communes === "Cerrillos") {
            currentLocation = {
                lat: -33.4873784,
                lng: -70.7038997
            }
            SetCommuneName(communes)
        }
        const c = 2

        if (count.c <= 1) {
            setState2({ currentLocation })
            setCount({ c })
        }

        console.log(communes)

    }, [count, state2, communes]);

    useEffect(() => {
        let isMounted = true

        navigator.geolocation.getCurrentPosition(
            function (position) {
                if (isMounted) {

                    setState({
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    })
                }
            },
            function (error) {
                alert("error")
            },
            {
                enableHighAccuracy: true
            }
        )


        return () => { isMounted = false }
    }, [state])

    return (
        <div style={{ height: '100vh' }}>
            <Map center={state2.currentLocation} zoom={state2.zoom} style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Marker
                    position={state2.currentLocation}
                    icon={IconPin} >
                    <Popup>
                        {communeName}
                    </Popup>
                </Marker>
            </Map>
        </div>
    )
}

export default connect(mapStateToProps, { sendCommunes })(MapViewData)
