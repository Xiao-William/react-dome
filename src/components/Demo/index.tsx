import React, { useEffect } from 'react'
import { loadModules } from 'esri-loader'
interface Ioptions {
    url: string,
    css: string
}
const Demo: React.FC = () => {
    useEffect(() => {
        initMap()
    }, [])
    const initMap = async () => {
        const options: Ioptions = {
            url: 'https://js.arcgis.com/4.24/init.js',
            css: 'https://js.arcgis.com/4.24/esri/themes/light/main.css',
        }  
        const [Map, TileLayer, MapView, esriConfig, SpatialReference, Point, Search,
            Locator] = await loadModules(
                [
                    "esri/Map", "esri/Basemap", "esri/layers/TileLayer",
                    "esri/views/MapView",
                    "esri/config",
                    "esri/geometry/SpatialReference",
                    "esri/geometry/Point",
                    "esri/widgets/Search",
                    "esri/tasks/Locator",
                ],
                options
            );
      const  map =new Map({
        basemap:'osm',

      });
      const view =new MapView({
        container:'viewDiv',
        map,
        zoom:10,
        center:[114.16546,22.27534]
      })

    }


    return (
        <div id="viewDiv" style={{ width: '100vw', height: '100vh' }}></div>
    )
}

export { Demo }