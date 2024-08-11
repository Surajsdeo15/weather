import React, { useState, useEffect } from 'react';
import './scroll.css';

function ShowData() {
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const ApiKey = process.env.REACT_APP_API_KEY;
   

    const fetchWeatherData = async (city) => {
        try {
            const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`);
            if (!Response.ok) {
                throw new Error('Failed to fetch Weather Data');
            }
            const data = await Response.json();
            setWeatherData(data);
            setError('');
        } catch (error) {
            setError(error.message);
            setWeatherData(null);
        }
    };

    useEffect(() => {
        // Fetch weather data for Jamshedpur by default
        fetchWeatherData('Jamshedpur');
    }, []);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData(inputValue);
        setInputValue('');
    };

    return (
        <>
            <div className='fixed w-full h-screen bg-gradient-to-t from-cyan-800 to-gray-800 pt-12 text-center'>
            <h1  className=' text-2xl md:text-8xl font-mono font-extrabold relative -top-6 md:-left-12 md:-top-12 text-cyan-700 '>WEATHER</h1>
            <h2  className='text-xs md:text-xl font-mono font-extrabold relative -top-6 left-16 md:left-24 md:-top-12 text-cyan-400 '>.By Suraj Singh Deo</h2>
 <div className='overflow-y-auto  h-[calc(100vh-14rem)] thin-scrollbar'>
                <div className=' w-96 ml-4 md:ml-0 md:w-[740px] transform md:translate-x-64 h-10 shadow-xl shadow-cyan-700 rounded-3xl bg-gray-800 flex gap-8 '>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter city name..."
                        className=' w-full md:w-5/6 h-full rounded-xl bg-transparent p-2 md:pl-8 text-xl font-mono font-bold text-gray-300 focus:outline-none'
                    />
                    <button
                        className='text-sm mr-4 md:mr-0 md:text-lg md:font-bold text-mono text-gray-400'
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>
                <div className='flex flex-col md:flex-row '>
                    <div className=' hidden md:block w-16 relative top-4 left-44 h-[598px] shadow-xl shadow-cyan-700 rounded-lg pt-6 bg-gray-800 '></div>
                  
                    <div className='flex flex-col gap-6'>
                    
                        <div className= ' w-96  md:w-[700px] relative top-8 md:top-4 md:left-44 h-[250px] ml-6 md:ml-12 pt-6 '>
                            {weatherData ? (
                                <div className='flex flex-col md:flex-row md:justify-between gap-4'>
                                    <div className='flex flex-col gap-4'>
                                        <h2 className='text-2xl md:text-6xl font-bold text-cyan-700 md:ml-20'>{weatherData.name}</h2>
                                        {weatherData.main && (
                                            <>
                                                <p className='text-xs md:text-lg text-orange-300 ml-20 -mt-4'>Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
                                                <p className='text-2xl  md:ext-4xl font-mono font-bold text-orange-700 mt-12 md:ml-20 '>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                                            </>
                                        )}
                                    </div>
                                    <div className='md:w-28 md:h-28 w-8 h-8 rounded-full border bg-orange-700 border-orange-700 shadow-xl shadow-orange-700 relative md:top-16 md:right-44 hidden md:block'>
                                        <div className='flex justify-center gap-8 text-cyan-700 font-bold text-6xl hidden md:block space-x-8'>
                                            <span>.</span>
                                            <span>.</span>
                                        </div>
                                        <div className='w-12 h-2 border-b-4 border-l-4 border-r-4 border-cyan-700 relative top-3 left-8 rounded-3xl hidden md:block '></div>
                                    </div>
                                </div>
                            ) : (
                                error && <p className='text-xl text-red-500'>{error}</p>
                            )}
                        </div>
                        {weatherData && weatherData.main && (
                            <div className='w-96 md:w-[700px] relative -top-5 md:top-4 md:left-44 h-[150px] rounded-3xl shadow-xl shadow-cyan-700 ml-5 md:ml-12 pt-10 md:pt-6 bg-gray-800 flex justify-center gap-20 p-4'>
                                <div className='space-y-8'>
                                    <p className='text-sm text-cyan-700 font-bold md:text-xl '> {weatherData.main.pressure} hPa</p>
                                    <p className='text-sm text-cyan-700 font-bold md:text-xl'> {weatherData.main.humidity}%</p>
                                </div>
                                <p className='text-sm text-cyan-700 font-bold md:text-xl mt-8 md:mt-10'> {weatherData.visibility} meters</p>
                                <div className='space-y-8'>
                                    <p className='text-sm text-cyan-700 font-bold md:text-xl'>{weatherData.wind.speed} m/s, </p>
                                    <p className='text-sm text-cyan-700 font-bold md:text-xl'> {weatherData.wind.deg}°, </p>
                                </div>
                            </div>
                        )}
                        {weatherData && (
                            <div className='w-96 md:w-[700px] relative -top-5 md:top-4 md:left-44 h-[150px] rounded-3xl shadow-xl shadow-cyan-700 ml-6 md:ml-12 pt-6 bg-gray-800 flex justify-center gap-12 items-center'>
                                <p className='text-sm text-cyan-700 font-bold md:text-xl '> {weatherData.coord.lat}, {weatherData.coord.lon}</p>
                                <p className='text-sm text-cyan-700 font-bold md:text-xl '> {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                                <p className='text-sm text-cyan-700 font-bold md:text-xl '>{(weatherData.main.temp_min - 273.15).toFixed(2)}°C / {(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
                            </div>
                        )}
                    </div>
                    <div className='w-96 md:w-[300px] relative top-2 md:top-4 md:left-44 h-64 md:h-[598px] rounded-3xl shadow-xl shadow-cyan-700 ml-6  md:ml-12 pt-6 bg-gray-800 flex flex-col justify-center md:gap-12 pl-4 text-orange-700 font-bold'>
                        {weatherData && weatherData.rain && <p className='text-sm md:text-xl'>Rain Volume (last 1h): {weatherData.rain["1h"]} mm</p>}
                        {weatherData && (
                            <>
                                <p className='md:text-2xl '>Cloudiness: {weatherData.clouds.all}%</p>
                                <p className='md:text-2xl'>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                <p className='md:text-2xl '>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} </p>
                            </>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </>
    );
}

export default ShowData;
