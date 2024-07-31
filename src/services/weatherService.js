import { DateTime } from "luxon";


const API_KEY= `${import.meta.env.VITE_API_KEY}`
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (infoType, searchParams)=>{
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({...searchParams,appid: API_KEY});

    return fetch(url)
    .then((res)=> res.json())
    .catch((err)=>{
        console.error("error- " ,err);
    })
}

const formatToLocalTime = (secs,offset,format="cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs+offset,{zone: 'utc'}).toFormat(format);


const iconUrlFromCode = (icon)=> `http://openweathermap.org/img/wn/${icon}@2x.png`


const formatCurrent=(data)=>{
    // console.log("timezone: ", data?.timezone);
    const {
        coord :{lat, lon},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise, sunset},
        weather,
        wind:{speed},
        timezone,
    } = data;

    const {main: details, icon} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return{
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise:formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset:formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon:iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        lat,
        lon,
        timezone,
    }
    
}

const formatForecastWeather = (secs,offset,data)=>{
    // offset = 19800;
    // console.log(secs,offset)
    //hourly
    const hourly = data.map((f)=>({
        temp:f.main.temp,
        title: formatToLocalTime(f.dt,offset,'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0,5);

    //daily
    const daily = data.filter((f)=>f.dt_txt.slice(-8) === "00:00:00")
    .map((f)=>({
        temp:f.main.temp,
        title: formatToLocalTime(f.dt,offset,'ccc'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }))
    return {hourly,daily}
}


const getFormattedWeatherData = async (searchParams) =>{
    try {
        const weatherData = await getWeatherData('weather', searchParams);
        // console.log("Weather data: ", weatherData);
        let formattedCurrentWeather = formatCurrent(weatherData);
        // console.log("formatted weather data: ", formattedCurrentWeather);
        const {dt,lat,lon,timezone} = formattedCurrentWeather

        const formattedForecastWeather = await getWeatherData('forecast', {
            lat,
            lon,
            units:searchParams.units
        })
        .then((d)=>formatForecastWeather(dt, timezone, d.list))
        return {...formattedCurrentWeather,...formattedForecastWeather};   
    } catch (error) {
        
    }
}

export default getFormattedWeatherData;