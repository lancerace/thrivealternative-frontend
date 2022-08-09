import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import NavBar from '../../components/NavBar/NavBar';
import { Button, Grid } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
interface IState {
  country: ICountry

}


interface ICountry {
  name: {
    common: string;
    nativeName: {
      ron: {
        common: string;
      }
    };
  }
  region: string;
  subregion: string;
  flags: {
    png: string;
    svg: string;
  }
  capital: string[];
  population: number;
  currency: {
    [key: string]: {
      name: string;
    }
  },
  borders: string[];
}
function Detail() {
  const location: any = useLocation();
  console.log(location);
  const country: ICountry = location.state.country;
  console.log(country);
  /*const [state,setState] = useState<ICountry>(country);
  
    useEffect(()=>{
      console.log(state);
     
    },[])*/

  return (
    <Grid container style={{ border: "0px solid red" }} justifyContent="center">
      <Grid container>
        <NavBar hoverColor="blue">
          <NavBar.Item to="/"><b>Where in the world?</b></NavBar.Item>
          <NavBar.Item to="/Signup"><span style={{ fontSize: "15px" }}>Dark mode</span></NavBar.Item>
        </NavBar>
      </Grid>

      {/**helper bar */}
      <Grid container item md={10} style={{ height: "20vh", border: "0px solid red" }}>

        <Grid container item md={12} alignItems="center" justifyContent="space-between">
          <Button variant="contained" style={{ backgroundColor: "white", color: "black", width: "15vh" }} onClick={() => {
            window.location.href = `${window.location.origin}/`;
          }}>Back</Button>
        </Grid>

      </Grid>



      {/**details */}
      <Grid item md={10} lg={10} style={{ border: "0px solid blue", height: "auto" }} container justifyContent="center">

        <Grid item md={6} lg={6} style={{ border: "0px solid red" }}>
          <img src={country?.flags.svg || ""} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} alt={country.name.common} />
        </Grid>

        {/**right side description */}
        <Grid container item md={6} lg={6} style={{ border: "0px solid green" }}>

          {/**title */}
          <Grid item md={12} lg={12}><h1>{country.name.common}</h1></Grid>

          {/**body */}
          <Grid item container md={12} lg={12} style={{ border: "0px solid red" }}>
            <Grid item md={6} lg={6} style={{ border: "0px solid green" }}>
              <p><b>Native Name:</b> {country.name.common}</p>
              <p><b>Population:</b> {country.population}</p>
              <p><b>Region:</b> {country.region}</p>
              <p><b>Sub Region:</b> {country.subregion}</p>
              <p><b>Capital:</b> {country.capital.join(",")}</p>
            </Grid>
            <Grid item>
              <p><b>Top Level Domain:</b></p>
              <p><b>Currencies:</b></p>
              <p><b>Languages:</b></p>
            </Grid>
          </Grid>

          {/**footer */}
          <Grid item md={12} lg={12}>
            <b>Border countries: </b> {
              country.borders.map((item, index) => {
                return (<Button variant="contained" key={index} style={{ backgroundColor: "white", color: "black", width: "10vh", marginRight: "2vh" }}>{item}</Button>)
              })
            }
          </Grid>

        </Grid>

      </Grid>
    </Grid>
  );
}

export default Detail;
