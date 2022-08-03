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
        const basemapVTURL = "https://api.hkmapservice.gov.hk/ags/map/basemap/HK80";
        const mapLabelVTUrl = "https://api.hkmapservice.gov.hk/ags/map/label-en/HK80";
        var apikey = "584b2fa686f14ba283874318b3b8d6b0";
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
        esriConfig.request.interceptors.push({
            before: function (params: any) {
                if (params.url.indexOf("api.hkmapservice.gov.hk") >= 0) {
                    if (params.requestOptions.query) {
                        params.requestOptions.query.key = apikey
                    } else {
                        params.requestOptions.query = {
                            key: apikey
                        }
                    }
                }
            },
            after: function (response: any) {
                if (!response.ssl) {
                    response.ssl = true;
                }
            }
        });

        const map = new Map();
        map.add(new TileLayer({
            url: basemapVTURL,
            copyright: "<a href='https://api.portal.hkmapservice.gov.hk/disclaimer' target='_blank'>&copy; Map from Lands Department <div class='landsdlogo'></div></a>"
        }));
        map.add(new TileLayer(mapLabelVTUrl));
        const mView = new MapView({
            container: "viewDiv",
            map: map,
            zoom: 11,
            center: new Point(833359, 822961, new SpatialReference({
                wkid: 2326
            })),
        });

        fetch(basemapVTURL + "?f=json&key=" + apikey).then(response => response.json())
            .then(data => {
                mView.constraints.lods = data.tileInfo.lods;
            });


        const searchWidget = new Search({
            view: mView,
            includeDefaultSources: false,
            locationEnabled: false,
            sources: [{
                name: 'Address',
                placeholder: 'Input Addresses',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/address/en'
                })
            }, {
                name: 'Building',
                placeholder: 'Building Name',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/building/en'
                })
            }, {
                name: 'Building Licence',
                placeholder: 'e.g BL 1/11',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/buildinglicence'
                })
            }, {
                name: 'Geo Community',
                placeholder: 'Input community Name',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/geocomm/en'
                })
            }, {
                name: 'Place Point',
                placeholder: 'e.g Tsim Sha Tsui',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib5000/poi/placepoint/en'
                })
            }, {
                name: 'POI',
                placeholder: 'e.g Tsim Sha Tsui',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib5000/poi/poipoint/en'
                })
            }, {
                name: 'Site',
                placeholder: 'e.g. TAIKOO, WONG TAI SIN TEMPLE',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/site/en'
                })
            }, {
                name: 'SubSite',
                placeholder: 'e.g. Wong Tai Sin',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/subsite/en'
                })
            }, {
                name: 'Lot',
                placeholder: 'e.g SSTL 112,IL 10',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/lot'
                })
            }, {
                name: 'GLA',
                placeholder: 'e.g gla-dn 110',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/gla'
                })
            }, {
                name: 'VGS',
                placeholder: 'e.g DLO/KW070',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ls/vacantgovsite'
                })
            }, {
                name: 'Street Intersection',
                placeholder: 'e.g. Nathan Road',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/streetintersection/en'
                })
            }, {
                name: 'Road',
                placeholder: 'e.g. Nathan Road',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/transportation/streetcentrelines/en'
                })
            }, {
                name: 'Local Control',
                placeholder: 'e.g. CM1/DN1819B',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/localcontrol'
                })
            }, {
                name: 'GeodeticHControl',
                placeholder: 'e.g. 2001.001',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/GeodeticHControl'
                })
            }, {
                name: 'GeodeticVControl',
                placeholder: 'e.g. 200001',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/GeodeticVControl'
                })
            }, {
                name: 'Utility Point',
                placeholder: 'e.g. LPO-123,FWH-123,LPO-EBE/D/123 ',
                locator: new Locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/utilities/utilitypoint'
                })
            },]
        });
        mView.ui.add(searchWidget, {
            position: "top-right"
        });

    }


    return (
        <div id="viewDiv" style={{ width: '100vw', height: '100vh' }}></div>
    )
}

export { Demo }