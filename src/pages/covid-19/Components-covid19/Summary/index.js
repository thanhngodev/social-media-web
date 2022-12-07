import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HighMaps from '../Charts/HighMaps';
import LineChart from '../Charts/LineChart';

export default function Summary({ report, selectedCountryId }){
    const [mapData, setMapData] = useState({});

    useEffect(() => {
        if(selectedCountryId){
            const mapData = import(
                `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
            ).then((res) => setMapData(res));
        }
    }, [selectedCountryId]);

    return (
        <>
        <div style={{marginTop: 10 }}>
            <Grid container spancing={3}>
                <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                </Grid>
                <Grid item sm={4} xs={12}>
                    <HighMaps mapData={mapData} />
                </Grid>
            </Grid>
        </div> 
        </>
    );
}