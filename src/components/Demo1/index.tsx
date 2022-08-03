import React, { useEffect } from 'react'
import { loadModules } from 'esri-loader'
import './index.css'

const Demo: React.FC = () => {
    const initMap = async () => {
        const [Map, ArcGISDynamicMapServiceLayer] = await loadModules(
            ["esri/map",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "dojo/domReady!"
            ],

        )
        const map = new Map("mapDiv", {
            logo: false
        });
        const layer1 = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/ecology/beijing_2012_3/MapServer");
        console.log(layer1, map);
        map.addLayer(layer1);

    }
    useEffect(() => {
        initMap()

    }, [])

    return (
        <div id="mapDiv" style={{ height: '800px' }}></div>
    )
}

export { Demo }