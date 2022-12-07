import { Container, Typography } from "@mui/material";
import { sortBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis-covid19";
import CountrySelector from "./Components-covid19/CountrySelector";
import HighLight from "./Components-covid19/HighLight";
import Summary from "./Components-covid19/Summary";
import 'moment/locale/vi';
import '@fontsource/roboto';
import './Covid19.css'
import Topbar from "../../components/topbar/Topbar";

moment.locale('vi');

export default function Covid19() {
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries().then((res) => {
            console.log({ res });

            const countries = sortBy(res.data, 'Country');
            setCountries(countries);

            setSelectedCountryId('vn');
        });
    }, []);

    const handleOnChange = (e) => {
        setSelectedCountryId(e.target.value);
    };

    useEffect(() => {
        if (selectedCountryId) {
            const { Slug } = countries.find(
                (country) => country.ISO2.toLowerCase() === selectedCountryId
            );
            getReportByCountry(Slug).then(res => {
                res.data.pop();
                setReport(res.data)
            });
        }
    }, [countries, selectedCountryId]);
    return (
        <>
        <Topbar />
        <div className="covid19">
            <Container style={{ marginTop: 10 }}>
                <div className="covid19Top">
                    <div className="covid19Left">
                        <Typography variant="h3" component='h3'> Số liệu COVID-19</Typography>
                        <Typography>{moment().format('LLL')}</Typography>
                    </div>
                    <div className="covid19Right">
                        <CountrySelector
                            countries={countries}
                            handleOnchange={handleOnChange}
                            value={selectedCountryId}
                        />
                    </div>
                </div>
                <HighLight report={report} className="covid19HightLight" />
                <Summary report={report} selectedCountryId={selectedCountryId} />
            </Container>
        </div>
        </>
    );
}
