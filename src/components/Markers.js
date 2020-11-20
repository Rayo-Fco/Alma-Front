import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconCarabineros, IconPdi } from './IconLocation'
import { selectActiveLatLng } from '../reducers/latLngReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/latLngAction'
import { sendIdMarker } from '../actions/IdMarkerAction'
import axios from 'axios'

const mapStateToProps = state => {
    return {
        latlng: selectActiveLatLng(state)
    }
}

function Markers({ latlng, sendLatLng, sendIdMarker}) {
    const [comisaria, setComisaria] = useState({ markersC: [] })
    const [pdi, setPdi] = useState({ markersP: [] })


    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source();
        const token = window.sessionStorage.getItem('tokenadmin')

        axios.get('http://localhost:3001/markers/comisaria', {
            headers: { Authorization: "Bearer " + token },
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
        const token = window.sessionStorage.getItem('tokenadmin')

        axios.get('http://localhost:3001/markers/pdi', {
            headers: { Authorization: "Bearer " + token },
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

    return (
        <div>
            { comisaria.markersC.map((markerC, index) => (
                <Marker
                    icon={IconCarabineros}
                    key={index}
                    position={JSON.parse("[" + markerC.latitude + ", " + markerC.longitude + "]")}
                    onClick={(markersC) => { console.log(markersC) }}>
                    <Popup>
                        {markerC.title}
                    </Popup>
                </Marker>

            ))
            }
            { pdi.markersP.map((markerP, index) => (
                <Marker
                    icon={IconPdi}
                    key={index}
                    position={JSON.parse("[" + markerP.latitude + ", " + markerP.longitude + "]")}
                    onClick={(markersP) => { alert(markersP._id) }}>
                    <Popup>
                        {markerP.title}
                    </Popup>
                </Marker>
            ))
            }


        </div>
    )
}
export default connect(mapStateToProps, { sendLatLng, sendIdMarker })(Markers)
