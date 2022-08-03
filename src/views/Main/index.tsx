import React, { memo, useEffect } from "react";
import * as  MapContainer from '@/components/MapContainer';
const Main: React.FC = memo(() => {
    useEffect(() => {
        console.log('main');
    }, []);
    return <MapContainer.Demo />
});

Main.displayName = 'Main';
export default Main;
