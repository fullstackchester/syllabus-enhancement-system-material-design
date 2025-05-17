// import React, { useEffect, useState } from 'react'
// import { Typography } from '@mui/material'
// import { Box } from '@mui/system'
// import axios from 'axios'

// export default function WeatherCard() {
//     const [data, setData] = useState({})
//     const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=malolos&appid=dfce7901d93a17aea1a214b511859583&units=metric`
//     // https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=234424015d616b887561a1681f950186
//     //https://api.openweathermap.org/data/2.5/weather?q=manila&appid=dfce7901d93a17aea1a214b511859583

//     useEffect(() => {
//         const getWeather = () => axios.request(API_URL).then(function (response) {
//             setData(response.data);
//         }).catch(function (error) {
//             console.error(error);
//         });

//         getWeather()
//     }, [])
    
//     return (
//         <Box
//             sx={{
//                 height: 'auto',
//                 minHeight: '10rem',
//                 width: '100%',
//                 backgroundColor: 'transparent',
//                 padding: '.5rem'
//             }}>
//             <Typography
//                 variant='h6'
//                 gutterBottom>Weather Forecast</Typography>
//             {data.weather ? <Typography variant='h4' color='primary'>{data.weather[0].main}</Typography> : ''}
//             {data.weather ? <Typography variant='subtitle2' gutterBottom>{data.weather[0].description}</Typography> : ''}
//             {data.name ?
//                 <Typography
//                     variant='body2'
//                     sx={{ marginTop: '1.5rem' }}>
//                     {data.name}
//                 </Typography> : ''}
//             {data.main ?
//                 <Typography
//                     variant='h2'
//                     sx={{ fontWeight: 'bold' }}>
//                     {`${data.main.temp.toFixed()}${String.fromCharCode(176)}C`}
//                 </Typography>
//                 : ''}
//             {data.main ? <Typography variant='body2'>{`Feels like: ${data.main.temp}`}</Typography> : ''}
//         </Box>
//     )
// }
