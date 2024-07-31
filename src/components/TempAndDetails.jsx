import { FaThermometerEmpty } from "react-icons/fa"
import { BiSolidDropletHalf } from "react-icons/bi"
import { FiWind } from "react-icons/fi"
import { GiSunrise, GiSunset } from "react-icons/gi"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"

export default function TempAndDetails({weather:{details, icon,temp,temp_min,temp_max,sunrise,sunset,speed,humidity,feels_like},units}) {

    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${Math.ceil(feels_like)}°`
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity}%`
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed} ${units==='metric'? 'km/h':'m/s'}`
        }
    ]
    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: `${sunrise}`
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: `${sunset}`
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${Math.ceil(temp_max)}°`
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${Math.ceil(temp_min)}°`
        }
    ]
    return (
        <div>
            <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
                <p>{details}</p>
            </div>

            <div className="flex flex-row items-center justify-between py-3">
                <img src={icon} alt="weather icon" className="w-20" />
                <p className="text-5xl">{Math.ceil(temp)}°</p>

                <div className="flex flex-col space-y-3 items-start">
                    {
                        verticalDetails.map((value) => (
                            <div key={value.id} className="flex font-light text-sm items-center justify-center">
                                <value.Icon size={18} className="mr-1" />
                                {value.title}:
                                <span className="font-medium ml-1">{value.value}</span>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
            {
                        horizontalDetails.map((value) => (

                            <div key={value.id} className="flex flex-row items-center font-light ml-1">
                                <value.Icon size={30}/>
                                {value.title}:<span className="font-medium ml-1">{value.value}</span>
                            </div>

                        ))
                    }
            </div>

        </div>
    )
}
