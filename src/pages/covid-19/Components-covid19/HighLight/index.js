import { Grid } from '@mui/material';
import React from 'react';
import HighLightCard from './HighLightCard';

export default function HightLight({ report }){
    const data = report && report.length ? report[report.length - 1] : [];
    const summary = [
        {
            title: 'Số ca nhiễm',
            count: data.Confirmed,
            type: 'confirmed'
            
        },
        {
            title: 'Khỏi',
            count: data.Recovered,
            type: 'recovered'
        },
        {
            title: 'Tử vong',
            count: data.Deaths,  
            type: 'death'
        }
    ]

    return (
        <>
            <Grid container spacing={3} > {
                summary.map((items) => (
                    <Grid item sm={4} xs={12} key={items.type}>
                        <HighLightCard title={items.title} count={items.count} type={items.type}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}