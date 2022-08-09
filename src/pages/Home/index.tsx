import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Grid, Input, InputAdornment, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
interface IState {
  countries: ICountry[];
  region: string;
}


interface ICountry {
  name: {
    common: string;
  }
  region: string;
  flags: {
    png: string;
    svg: string;
  }
  capital: string[];
  population: number;
}
function Home() {

  const [state, setState] = useState<IState>({ countries: [], region: "" });
  let navigate = useNavigate();


  const fetchCountries = async () => {

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all`);
    //take 10 elements just for an example. 
    setState({ ...state, countries: data.slice(1, 13) })
  };

  const fetchCountriesByRegion = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/region/${state.region}`);
    //take 10 elements just for an example. 
    setState({ ...state, countries: data })

  };

  const fetchCountriesByName = async (name: string) => {
    if (name.length > 0) {
      console.log(name);
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/name/${name}`);
      console.log(data);
      //take 10 elements just for an example. 
      setState({ ...state, countries: data })
    }

  };




  useEffect(() => {
    fetchCountries();

  }, [])

  useEffect(() => {
    fetchCountriesByRegion();
  }, [state.region])

  return (
    <Grid container style={{ border: "0px solid red", backgroundColor: "#fafafa" }} justifyContent="center">
      <Grid container>
        <NavBar hoverColor="blue">
          <NavBar.Item to="/"><b>Where in the world?</b></NavBar.Item>
          {/* <NavBar.Item to="/Services">Services</NavBar.Item>
              <NavBar.Item to="/Pricing">Pricing</NavBar.Item>
              <NavBar.Item to="/Login">Log In</NavBar.Item>*/}
          <NavBar.Item to="/Signup"><span style={{ fontSize: "15px" }}>Dark mode</span></NavBar.Item>
        </NavBar>
      </Grid>

      {/**helper bar */}
      <Grid container item md={10} style={{ height: "20vh", border: "0px solid red" }}>

        <Grid container item md={12} alignItems="center" justifyContent="space-between">

          <Input id="search" placeholder="Search for a country.." startAdornment={
            <InputAdornment position="start"><SearchIcon />
            </InputAdornment>
          } onChange={(e) => {
            fetchCountriesByName(e.target.value);
          }}></Input>


          <Select
            defaultValue=""
            value={state.region}
            onChange={(e) => {
              setState({ ...state, region: e.target.value })
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>Filter By Region</em>
            </MenuItem>
            <MenuItem value="africa">Africa</MenuItem>
            <MenuItem value="america">America</MenuItem>
            <MenuItem value="asia">Asia</MenuItem>
            <MenuItem value="europe">Europe</MenuItem>
            <MenuItem value="oceania">Oceania</MenuItem>
          </Select>
        </Grid>


      </Grid>


      {/**list of countries */}
      <Grid item md={10} style={{ border: "0px solid blue", height: "auto" }} container justifyContent="center">
        {
          state.countries.map((country, index) => {
            return (
              /** use index as key just for this challenge. but ideally using uid for production*/
              <Grid key={index} item md={2} container className={style.countryContainer} style={{ border: "0px solid red", marginBottom: "10vh", marginRight: "5vh", marginLeft: "5vh" }}
                onClick={() => {
                  //window.location.href = `${window.location.origin}/details`;
                  navigate("/details",{state: {country: country}});
                }}>

                <Grid item md={12} style={{ border: "0px solid red", height: "20vh" }}>
                  <img src={country.flags.svg} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} alt={country.name.common} />
                </Grid>

                <Grid container style={{ border: "0px solid green" }} className={style.descriptionContainer}>
                  <Grid item md={12} sm={12}><b>{country.name.common}</b></Grid>

                  <Grid item md={12} sm={12}>Population: {country.population}</Grid>
                  <Grid item md={12} sm={12}>Region: {country.region}</Grid>
                  <Grid item md={12} sm={12}>Capital: {country.capital}</Grid>
                </Grid>

              </Grid>

            )

          })
        }
      </Grid>
    </Grid>
  );
}

export default Home;
