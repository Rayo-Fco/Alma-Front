import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { sendCommunes } from '../actions/communesAction'
import { connect } from "react-redux";
import { selectActiveCommunes } from '../reducers/communesReducer'
import { IconPin } from './IconLocation'
import { useLocation } from 'wouter';

const mapStateToProps = state => {
    return {
        communes: selectActiveCommunes(state)
    }
}

function MapViewData({ communes }) {
    const [count, setCount] = useState({ c: 0 })
    const [communeName, SetCommuneName] = useState('')
    const [, navigate] = useLocation()

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
        } else if (communes === "Cerro Navia") {
            currentLocation = {
                lat: -33.4290011,
                lng: -70.7307595
            }
        } else if (communes === "Conchalí") {
            currentLocation = {
                lat: -33.3965342,
                lng: -70.6708915
            }
        } else if (communes === "El Bosque") {
            currentLocation = {
                lat: -33.5556072,
                lng: -70.6661592
            }
        } else if (communes === "Estación Central") {
            currentLocation = {
                lat: -33.4534456,
                lng: -70.6905739
            }
        } else if (communes === "Huechuraba") {
            currentLocation = {
                lat: -33.3748475,
                lng: -70.6370713
            }
        } else if (communes === "Independencia") {
            currentLocation = {
                lat: -33.4222791,
                lng: -70.6554112
            }
        } else if (communes === "La Cisterna") {
            currentLocation = {
                lat: -33.5347067,
                lng: -70.6637976
            }
        } else if (communes === "La Florida") {
            currentLocation = {
                lat: -33.5204165,
                lng: -70.599348
            }
        } else if (communes === "La Granja") {
            currentLocation = {
                lat: -33.5433894,
                lng: -70.6324196
            }
        } else if (communes === "La Pintana") {
            currentLocation = {
                lat: -33.5830182,
                lng: -70.6292425
            }
        } else if (communes === "La Reina") {
            currentLocation = {
                lat: -33.442607,
                lng: -70.5434343
            }
        } else if (communes === "Las Condes") {
            currentLocation = {
                lat: -33.4081069,
                lng: -70.5673758
            }
        } else if (communes === "Lo Barnechea") {
            currentLocation = {
                lat: -33.3610533,
                lng: -70.5054732
            }
        } else if (communes === "Lo Espejo") {
            currentLocation = {
                lat: -33.5243181,
                lng: -70.6958048
            }
        } else if (communes === "Lo Prado") {
            currentLocation = {
                lat: -33.4416447,
                lng: -70.717381
            }
        } else if (communes === "Macul") {
            currentLocation = {
                lat: -33.4814929,
                lng: -70.5992918
            }
        } else if (communes === "Maipú") {
            currentLocation = {
                lat: -33.5097323,
                lng: -70.7563382
            }
        } else if (communes === "Ñuñoa") {
            currentLocation = {
                lat: -33.4538707,
                lng: -70.5937553
            }
        } else if (communes === "Peñalolén") {
            currentLocation = {
                lat: -33.4794626,
                lng: -70.5363195
            }
        } else if (communes === "Providencia") {
            currentLocation = {
                lat: -33.4313271,
                lng: -70.6089495
            }
        } else if (communes === "Pudahuel") {
            currentLocation = {
                lat: -33.4365561,
                lng: -70.7513677
            }
        } else if (communes === "Quilicura") {
            currentLocation = {
                lat: -33.3686752,
                lng: -70.7313338
            }
        } else if (communes === "Quinta Normal") {
            currentLocation = {
                lat: -33.4223485,
                lng: -70.6960244
            }
        } else if (communes === "Recoleta") {
            currentLocation = {
                lat: -33.4873784,
                lng: -70.7038997
            }
        } else if (communes === "Renca") {
            currentLocation = {
                lat: -33.4036071,
                lng: -70.7047995
            }
        } else if (communes === "San Joaquín") {
            currentLocation = {
                lat: -33.4960453,
                lng: -70.6284055
            }
        } else if (communes === "San Miguel") {
            currentLocation = {
                lat: -33.4877662,
                lng: -70.6504591
            }
        } else if (communes === "San Ramón") {
            currentLocation = {
                lat: -33.5426888,
                lng: -70.64288
            }
        } else if (communes === "Santiago") {
            currentLocation = {
                lat: -33.4370208,
                lng: -70.6486695
            }
        } else if (communes === "Vitacura") {
            currentLocation = {
                lat: -33.3869341,
                lng: -70.5767754
            }
        }else if(communes === ""){
            navigate('/')
        }
        SetCommuneName(communes)
        const c = 2

        if (count.c <= 1) {
            setState2({ currentLocation })
            setCount({ c })
        }

        console.log(communes)

    }, [count, state2, communes, navigate]);

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
