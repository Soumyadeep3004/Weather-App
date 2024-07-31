import { useEffect, useState } from 'react'
import './App.css'
import Forecast from './components/Forecast'
import Inputs from './components/Inputs'
import TempAndDetails from './components/TempAndDetails'
import TimeAndLocation from './components/TimeAndLocation'
import TopButtons from './components/TopButtons'
import getFormattedWeatherData from './services/weatherService'

function App() {

  const [query, setQuery] = useState({ q: 'kolkata' })
  const [units, setUnit] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async () => {
    await getFormattedWeatherData({...query, units}).then((data) => {
      setWeather(data);
    })
    console.log(weather)
    
  }

  useEffect(()=>{
    getWeather()

  },[query, units])

  const formatBackground = ()=>{
    if(!weather)
      return 'from-cyan-600 to-blue-700'

    const tempo = units === "metric" ? 35:85

    if(weather.temp<=tempo) return 'from-cyan-600 to-blue-700';

    // if(weather.icon == "http://openweathermap.org/img/wn/10n@2x.png") return 'from-black-600 to-grey-700'
    return 'from-yellow-600 to-orange-700';
  }

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-grey-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} setUnit={setUnit}/>

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units}/>
          <Forecast title='3 hour step forecast' data={weather.hourly}/>
          <Forecast title='daily forecast' data={weather.daily}/>
        </>
      )}
    </div>
  )
}

export default App
