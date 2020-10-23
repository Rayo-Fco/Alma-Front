import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markets from './Markers'
import { sendLatLng } from '../actions/sendLatLngAction'
import { connect } from "react-redux";

function MapView({ sendLatLng }) {

    const [count, setCount] = useState({ c: 0 })
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    })
    const [state2, setState2] = useState({
        currentLocation: { lat: 0, lng: 0 },
        zoom: 23
    })
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
        if (state.latitude && state.longitude) {
            const currentLocation = {
                lat: state.latitude,
                lng: state.longitude
            }
            const c = 2

            if (count.c <= 1) {
                setState2({ currentLocation })
                setCount({ c })
            }
        }

        return () => { isMounted = false }
    }, [state, count])

    return (
        <div style={{ height: '100vh' }}>
            <Map center={state2.currentLocation} zoom={state2.zoom} onClick={(e) => { sendLatLng(e.latlng) }} style={{ width: '100%', height: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Markets />
            </Map>
        </div>
    )
}

export default connect(null, { sendLatLng })(MapView)
