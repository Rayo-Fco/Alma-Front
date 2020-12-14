import { useEffect } from 'react'
import { useLeaflet } from 'react-leaflet'
import Locate from 'leaflet.locatecontrol'

export default function LocateControl() {

  const { map } = useLeaflet()

  useEffect(() => {

    const locateOptions = {
      position: 'bottomleft',
      maxZoom: 19,
      strings: {
          title: 'Ir donde estoy'
      },
      onActivate: () => {}
    }

    const lc = new Locate(locateOptions)
    
    lc.addTo(map)

  }, [map])

  return null

}