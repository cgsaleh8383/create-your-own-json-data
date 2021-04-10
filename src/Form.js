import React, { useState } from 'react';
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { dataTemplate, options } from './data/options';
import faker from 'faker';
import download from 'downloadjs';

const catagories = Object.keys(options);
const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: "100%",
    },
    chips: {
        display: "flex",
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    }
}))

const Form = () => {
    const [data, setData] = useState(dataTemplate);
    const [numberOfData, setNumberOfData] = useState(1)
    const classes = useStyles();
    const handleChange = (e) => {
        ////console.log(e.target.name, e.target.value);
        let copyData = { ...data };
        copyData[e.target.name] = {};
        e.target.value.forEach(item => {
            copyData[e.target.name][item] = ''
        })
        setData(copyData)
    }
    const generateData = () => {
        let copyData = JSON.parse(JSON.stringify(options));
        let arrData = [];
        for (let i = 0; i< numberOfData; i++) {
            for(let category of catagories) {
                for(let key of Object.keys(options[category])) {
                    if(data[category][key] !== undefined){
                        copyData[category][key] = faker[category][key]();
                    }
                }
            }
            arrData.push(copyData);
            copyData = JSON.parse(JSON.stringify(options));
        }
        
        download(JSON.stringify(arrData), 'fake_data.json', 'json');
        setNumberOfData(1)
        setData(dataTemplate)
    }
    return (
        <>
            <Grid container spacing={2}>
                {
                    catagories.map(category => (
                        <Grid item sm={3} key={category}>
                            <Paper component={Box} p={3} >
                                <FormControl className={classes.formControl}>
                                    <InputLabel>{category}</InputLabel>
                                    <Select name={category} fullWidth multiple value={Object.keys(data[category])} onChange={handleChange} renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {
                                                selected.map(value => (
                                                    <Chip className={classes.chip} key={value} label={value} />
                                                ))
                                            }
                                        </div>
                                    )}>{
                                            Object.keys(options[category]).map(name => (
                                                <MenuItem key={name} value={name}>{name}</MenuItem>
                                            ))
                                        }</Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                    ))
                }
            </Grid>
            <Paper component={Box} p={3} my={1}>
                <TextField fullWidth value={numberOfData} onChange={e => setNumberOfData(e.target.value)} variant="outlined" label="enter the number of fake data" placeholder="number of fake data"/>
            </Paper>
            <Button variant="contained" color='secondary' onClick={generateData}>Generate Data</Button>
        </>
    );
};

export default Form;