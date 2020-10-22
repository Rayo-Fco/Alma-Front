import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation, IconCarabineros, IconPdi } from './IconLocation'
import { selectActiveLatLng } from '../reducers/LatLngDrawerReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/sendLatLngAction'
import axios from 'axios'
const mapStateToProps = state => {
    return {
        latlng: selectActiveLatLng(state)
    }
}


function Markers({ latlng, sendLatLng }) {
    const [comisaria, setComisaria] = useState({ markersC: [] })
    const [pdi, setPdi] = useState({ markersP: [] })
    const [state, setState] = useState({
        longitude: 0,
        latitude: 0,
    })
    const [state2, setState2] = useState({
        currentLocation: {
            "you": [
                0, 0
            ]
        },
        zoom: 23
    })

    useEffect(() => {
        const ac = new AbortController();
        const datas = async () => {
            const res = await axios.get('http://localhost:3001/markers/comisaria')
            setComisaria({ markersC: res.data })
        }
        datas()
        return () => ac.abort();
    }, [setComisaria])

    useEffect(() => {
        const ac = new AbortController();
        const datas = async () => {
            const res = await axios.get('http://localhost:3001/markers/pdi')
            setPdi({ markersP: res.data })
        }
        datas()
        return () => ac.abort();
    }, [setPdi])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                })
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
                "you": [
                    state.latitude,
                    state.longitude
                ]
            }
            setState2({ currentLocation })

        }
    }, [state])



    return (
        <div>
            <Marker
                position={state2.currentLocation.you}
                icon={IconLocation}>
                <Popup>
                    Aqui estas tu
                </Popup>
            </Marker>


            { comisaria.markersC.map((markerC, index) => (
                <Marker
                    key={index}
                    position={JSON.parse("[" + markerC.latitude + ", "+ markerC.longitude +"]")}
                    icon={IconCarabineros} >
                    <Popup>
                        {markerC.title}
                    </Popup>
                </Marker>

            ))
            }
            { pdi.markersP.map((markerP, index) => (
                    <Marker
                        key={index}
                        position={JSON.parse("[" + markerP.latitude + ", "+ markerP.longitude +"]")}
                        icon={IconPdi} >
                        <Popup>
                            {markerP.title}

                        </Popup>
                    </Marker>
            ))
            }


        </div>
    )
}
export default connect(mapStateToProps, { sendLatLng })(Markers)
