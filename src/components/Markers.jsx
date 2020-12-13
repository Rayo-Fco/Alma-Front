import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconCarabineros, IconPdi } from './IconLocation'
import { selectActiveLatLng } from '../reducers/latLngReducer'
import { selectActiveMarker } from '../reducers/markerReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/latLngAction'
import { refreshMarker } from '../actions/markerAction'
import axios from 'axios'
import api from '../services/api'

const mapStateToProps = state => {
    return {
        marker: selectActiveMarker(state),
        latlng: selectActiveLatLng(state)

    }
}

function Markers({ marker }) {
    const [comisaria, setComisaria] = useState({ markersC: [] })
    const [pdi, setPdi] = useState({ markersP: [] })

    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source()
        const token = window.sessionStorage.getItem('tokenadmin')
        const query = async () => {

            await api.get(`/markers/comisaria`, {
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
        }
        query()
        return function () {
            isMounted = false;
        }

    }, [setComisaria, marker]);

    useEffect(() => {
        let isMounted = true
        let source = axios.CancelToken.source();
        const token = window.sessionStorage.getItem('tokenadmin')
        const query = async () => {

            await api.get(`/markers/pdi`, {
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
        }
        query()
        return function () {
            isMounted = false;
        }

    }, [setPdi, marker]);

    return (
        <div>
            { comisaria.markersC.map((markerC, index) => (
                <Marker
                    icon={IconCarabineros}
                    key={index}
                    position={JSON.parse("[" + markerC.latitude + ", " + markerC.longitude + "]")}>
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
                    position={JSON.parse("[" + markerP.latitude + ", " + markerP.longitude + "]")}>
                    <Popup>
                        {markerP.title}
                    </Popup>
                </Marker>
            ))
            }


        </div>
    )
}
export default connect(mapStateToProps, { sendLatLng, refreshMarker })(Markers)
