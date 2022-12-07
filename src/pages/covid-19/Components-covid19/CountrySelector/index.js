import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    fromControl: {
        margin: '15px 0',
    }
}));

export default function CountrySelector({ value, handleOnchange, countries }) {
    const styles = useStyles();

    return (
        <>
            <FormControl className={styles.fromControl}>
                <InputLabel htmlFor="country-selector" shrink>
                    Quốc gia
                </InputLabel>
                <NativeSelect
                    value={value}
                    onChange={handleOnchange}
                    inputProps={{
                        name: 'country',
                        id: 'country-selector',
                    }}
                >
                    {
                        countries.map((country) => {
                            return (
                                <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                                    {country.Country}
                                </option>
                            );
                        })
                    }
                </NativeSelect>
                <FormHelperText> Lựa chọn quốc gia </FormHelperText>
            </FormControl>
        </>
    )
}