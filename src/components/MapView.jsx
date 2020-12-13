import React, { useState } from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers'
import { sendLatLng } from '../actions/latLngAction'
import { connect } from "react-redux"
import LocateControl from './LocateControl';

function MapView({ sendLatLng }) {
    window.scrollTo(0,0)
    const [state2] = useState({
        currentLocation: { lat: -33.4372, lng:  -70.6506 },
        zoom: 12
    })

    return (
        <div style={{ height: '90vh' }}>
            <Map center={state2.currentLocation} zoom={state2.zoom} onClick={(e) => { sendLatLng(e.latlng) }} style={{ width: '100%', height: '100%' }} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Markers />
                <LocateControl startDirectly/>
                <ZoomControl position='bottomleft' />
            </Map>
        </div>
    )
}

export default connect(null, { sendLatLng })(MapView)
