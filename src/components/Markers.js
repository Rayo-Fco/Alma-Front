import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation, IconCarabineros, IconPdi } from './IconLocation'
import { selectActiveLatLng } from '../reducers/latLngReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/latLngAction'
import axios from 'axios'
import { useLocation } from 'wouter'
import { isFirefox } from 'react-device-detect'
const mapStateToProps = state => {
    return {
        latlng: selectActiveLatLng(state)
    }
}


function Markers({ latlng, sendLatLng }) {
    const [, navigate] = useLocation()
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
        let isMounted = true
        let source = axios.CancelToken.source();

        axios.get('http://localhost:3001/markers/comisaria', {
            cancelToken: source.token,
        })
            .then(res => {
                if (isMounted) {
                    setComisaria({ markersC: res.data })
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

    }, [setComisaria]);

    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source();

        axios.get('http://localhost:3001/markers/pdi', {
            cancelToken: source.token,
        })
            .then(res => {
                if (isMounted) {
                    setPdi({ markersP: res.data })
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

    }, [setPdi]);

    useEffect(() => {
        let isMounted = true
        if (isFirefox) {
            console.log(true)
        }
        else {
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
                    navigate('/')
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
        }
        return () => { isMounted = false }
    }, [state, navigate])



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
                    position={JSON.parse("[" + markerC.latitude + ", " + markerC.longitude + "]")}
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
                    position={JSON.parse("[" + markerP.latitude + ", " + markerP.longitude + "]")}
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
