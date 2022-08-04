import React, { useEffect, useRef } from 'react'
import { loadModules } from 'esri-loader'
import config from '../config'
import './index.css'

const Demo: React.FC = () => {

    useEffect(() => {
        initMap()

    }, [])


    const initMap = async () => {


        const [Map, MapView, Basemap, TileLayer, BasemapToggle, ScaleBar, Zoom, Search, Graphic, GraphicsLayer, Point, locator] = await loadModules(
            [
                'esri/Map',
                'esri/views/MapView',
                'esri/Basemap',
                'esri/layers/TileLayer',
                'esri/widgets/BasemapToggle',
                'esri/widgets/ScaleBar',
                'esri/widgets/Zoom',
                'esri/widgets/Search',
                "dojo/domReady!",
                "esri/symbols/Font",
                "esri/symbols/TextSymbol",
                "esri/geometry/Point",
                'esri/Graphic',
                "esri/Color",
                'esri/layers/GraphicsLayer',
                "esri/geometry/Point",
                'esri/rest/locator'
            ],
            config.options,
        );

        let basemap = new Basemap({
            baseLayers: [
                new TileLayer({
                    url: 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer',
                    title: 'Basemap',
                    id: 'layerid'
                }),
            ],
            title: 'basemap',
            id: 'basemap',
        });

        const map = new Map({ basemap, nav: true });

        const mapView = new MapView({
            container: 'mapview',
            map,
            zoom: 10,
            center: [114.189566, 22.296307],
        });
        const basemapToggle = new BasemapToggle({
            view: mapView,
            nextBasemap: 'hybrid',
            container: 'basemapToggle',
        });


        const scaleBar = new ScaleBar({
            view: mapView,
            unit: 'metric',
            container: 'scaleBar',
        });
        const zoom = new Zoom({
            view: mapView,
            container: 'zoom',
        });
        var searchWidget = new Search({
            view: mapView,
            includeDefaultSources: false,
            locationEnabled: false,
            sources: [{
                name: 'Address',
                placeholder: 'Input Addresses',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/address/en'
                })
            }, {
                name: 'Building',
                placeholder: 'Building Name',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/building/en'
                })
            }, {
                name: 'Building Licence',
                placeholder: 'e.g BL 1/11',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/buildinglicence'
                })
            }, {
                name: 'Geo Community',
                placeholder: 'Input community Name',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/geocomm/en'
                })
            }, {
                name: 'Place Point',
                placeholder: 'e.g Tsim Sha Tsui',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib5000/poi/placepoint/en'
                })
            }, {
                name: 'POI',
                placeholder: 'e.g Tsim Sha Tsui',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib5000/poi/poipoint/en'
                })
            }, {
                name: 'Site',
                placeholder: 'e.g. TAIKOO, WONG TAI SIN TEMPLE',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/site/en'
                })
            }, {
                name: 'SubSite',
                placeholder: 'e.g. Wong Tai Sin',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/buildings/subsite/en'
                })
            }, {
                name: 'Lot',
                placeholder: 'e.g SSTL 112,IL 10',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/lot'
                })
            }, {
                name: 'GLA',
                placeholder: 'e.g gla-dn 110',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ic1000/gla'
                })
            }, {
                name: 'VGS',
                placeholder: 'e.g DLO/KW070',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ls/vacantgovsite'
                })
            }, {
                name: 'Street Intersection',
                placeholder: 'e.g. Nathan Road',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/loc/streetintersection/en'
                })
            }, {
                name: 'Road',
                placeholder: 'e.g. Nathan Road',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/transportation/streetcentrelines/en'
                })
            }, {
                name: 'Local Control',
                placeholder: 'e.g. CM1/DN1819B',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/localcontrol'
                })
            }, {
                name: 'GeodeticHControl',
                placeholder: 'e.g. 2001.001',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/GeodeticHControl'
                })
            }, {
                name: 'GeodeticVControl',
                placeholder: 'e.g. 200001',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/sc/GeodeticVControl'
                })
            }, {
                name: 'Utility Point',
                placeholder: 'e.g. LPO-123,FWH-123,LPO-EBE/D/123 ',
                locator: new locator({
                    url: 'https://api.hkmapservice.gov.hk/ags/gc/ib1000/utilities/utilitypoint'
                })
            },],
            container: 'searchWidget',
        });
        // Add the search widget to the top right corner of the view

        mapView.ui.components = [];

        mapView.ui.add(searchWidget);
        mapView.ui.add(zoom);
        mapView.ui.add(scaleBar);
        mapView.ui.add(basemapToggle);
        // function addPointGraphicsLayer(a: number) {
        //     //png符号
        //     let symbol1 = {
        //         "type": "esriPMS",
        //         "url": "https://zhengxin-pub.bj.bcebos.com/financepic/96e86e450404f7e40c11f70d5e358af7_fullsize.jpg", //图片位置   真正点的坐标在图片中心点，如果要将图片上移，yoffset为正，右移 xoffset为正
        //         "width": 15, //当前图片宽度
        //         "height": 17,//当前图片高度
        //         "xoffset": 0,
        //         "yoffset": 0
        //     };
        //     //gif符号
        //     let symbogif = {
        //         "type": "esriPMS",
        //         "url": "../../examples/assets/images/warn.gif", //图片位置   真正点的坐标在图片中心点，如果要将图片上移，yoffset为正，右移 xoffset为正
        //         "width": 30, //当前图片宽度
        //         "height": 30,//当前图片高度
        //         "xoffset": 0,
        //         "yoffset": 0
        //     };
        //     let symbol;
        //     if (a === 1) {
        //         symbol = symbol1
        //     }
        //     else symbol = symbogif;
        //     let pointjson =
        //         [    //以下为数组，这里只写了一个。
        //             {
        //                 "geometry": {
        //                     "x": 116.31075939030517, "y": 40.04059194613418,  //经纬度
        //                     "spatialReference": { "wkid": 4326 }
        //                 },
        //                 "attributes": {
        //                     "Name": "",
        //                     "Address": ""
        //                 },
        //                 "symbol": symbol,
        //                 "infoTemplate": {  //点击该点显示的信息窗口内容
        //                     "title": "企业信息",
        //                     "content": "名称: ${Name} <br/>地址: ${Address}"
        //                 }
        //             }
        //         ];
        //     let graphic = new Graphic("企业", null, pointjson, null, true);
        //     map.addLayer(graphic)
        //     // addGraphic("企业", null, pointjson, null, true);
        // }

        // //叠加线图层
        // function addPolyline() {
        //     let Polyline = [{//线图层的数据
        //         "geometry": {
        //             //必填，构成线的结点坐标，根据结点顺序绘制线，所以一定要注意点顺序
        //             "paths": [[[-29787466.330565456, 4060315.5557630984],
        //             [-28495986.30065946, 4060315.5557630984],
        //             [-28427498.72331596, 4422321.321721597],
        //             [-28114412.655459963, 3991827.978419599],
        //             [-27654567.493296463, 4079883.4350040983],
        //             [-27546944.157470964, 3933124.3406965993]]],
        //             "spatialReference": { "wkid": 102100 }//可选，坐标系
        //         },
        //         "attributes": {//属性字段，根据实际情况添加属性字段
        //             "ObjectID": 1,
        //             "Name": "线"
        //         },
        //         "symbol": {//必选，线符号
        //             "width": 3,//可选，线的宽度，默认为1
        //             "style": "esriSLSSolid",//可选，线样式默认为esriSLSSolid，实线
        //             "type": "esriSLS",//必选，边线类型，此处是指线
        //             "color": [0, 206, 209]//必选，线的颜色
        //         }
        //     }];
        //     let graphic = new Graphic(Polyline);
        //     map.graphics.add(graphic)
        // }
        // function addPolygon() {
        //     //面图层的数据
        //     var polygon = [{
        //         geometry: {
        //             "rings": [[[-26852284.444415465, 3541766.7558766007], [-27380617.183922466, 2847107.0428211037],
        //             [-28280739.62900846, 2475317.3372421055], [-28642745.39496696, 2954730.3786466033],
        //             [-29092806.617509957, 3385223.721948602], [-28946047.523202457, 3629822.2124611004],
        //             [-28280739.62900846, 3893988.5822145995], [-27742622.94988096, 3688525.8501841],
        //             [-27615431.734814465, 3884204.6425940995], [-27400185.063163463, 3688525.8501841],
        //             [-26852284.444415465, 3541766.7558766007]]],
        //             "spatialReference": { "wkid": 102100 }//坐标系
        //         },
        //         attributes: {
        //             OBJECTID: 1,
        //             name: '面1'
        //         },
        //         symbol: {//可选，默认渲染符号，即不在渲染区间的值使用此符号
        //             "color": [255, 165, 0, 200],//必选，符号颜色
        //             "outline": {//可选，符号边线设置
        //                 "color": [255, 0, 0],//必选，边线颜色
        //                 "width": 1,//必选，边线宽度
        //                 "type": "esriSLS"
        //                 //                    "style": "esriSLSNull"//可选，边线样式,当前设置时不显示边线，默认为：esriSFSSolid，显示边线
        //             },
        //             "type": "esriSFS",//必选，符号类型，此处是指面符号，点符号为："esriSMS"
        //             "style": "esriSFSSolid"//必选，填充样式
        //         },
        //         "infoTemplate": {  //点击该面显示的信息窗口内容
        //             "title": "面信息",
        //             "content": "OBJECTID: ${OBJECTID}"
        //         }
        //     },
        //     {
        //         geometry: {
        //             "type": "polygon",
        //             "rings": [[[-30472024.28830262, 5253956.189464113], [-29532766.08473462, 5058277.397054112],
        //             [-29571901.843216617, 4666919.812234111], [-29963259.42803662, 3923340.40107611],
        //             [-30628567.32223062, 4353833.74437811], [-30472024.28830262, 5253956.189464113]]],
        //             "spatialReference": { "wkid": 102100 }
        //         },
        //         attributes: {
        //             OBJECTID: 2,
        //             name: '面2'
        //         },
        //         symbol: {//可选，默认渲染符号，即不在渲染区间的值使用此符号
        //             "color": [255, 69, 0, 200],//必选，符号颜色
        //             "outline": {//可选，符号边线设置
        //                 "color": [139, 26, 26],//必选，边线颜色
        //                 "width": 1.5,//必选，边线宽度
        //                 "type": "esriSLS"//必选，边线类型，此处是指线
        //                 //                        "style": "esriSFSSolid"//可选，边线样式
        //             },
        //             "type": "esriSFS",//必选，符号类型，此处是指面符号，点符号为："esriSMS"
        //             "style": "esriSFSSolid"//必选，符号样式
        //         },
        //         "infoTemplate": {  //点击该面显示的信息窗口内容
        //             "title": "面信息",
        //             "content": "OBJECTID: ${OBJECTID} <br/>"
        //         }
        //     }];
        //     var graphic = new Graphic(polygon);
        //     map.graphics.add(graphic)
        // }

        // 地图加载完成后执行函数

    }


    return (
        <div className='main'>
            <div id="mapview"></div>
            <div id='basemapToggle'></div>
            <div id="zoom"></div>
            <div id='scaleBar'></div>
            <div id='searchWidget'></div>
        </div>





    )
}

export { Demo }