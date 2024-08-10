import React, { useState, useEffect } from 'react';
import './scroll.css';

function ShowData() {
    const [inputValue, setInputValue] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const ApiKey = '30796afdb90cc0d1c4fba661ea797f8f';

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
            <h1  className='text-8xl font-mono font-extrabold relative -left-12 -top-12 text-cyan-700 '>WEATHER</h1>
            <h2  className='text-xl font-mono font-extrabold relative left-24 -top-12 text-cyan-400 '>.By Suraj Singh Deo</h2>
 <div className='overflow-y-auto  h-[calc(100vh-14rem)] thin-scrollbar'>
                <div className='w-[740px] transform translate-x-64 h-10 shadow-xl shadow-cyan-700 rounded-3xl bg-gray-800 flex gap-8 '>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Enter city name..."
                        className='w-5/6 h-full rounded-xl bg-transparent p-2 pl-8 text-xl font-mono font-bold text-gray-300 focus:outline-none'
                    />
                    <button
                        className='text-lg font-bold text-mono text-gray-400'
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>
                <div className='flex '>
                    <div className='w-16 relative top-4 left-44 h-[598px] shadow-xl shadow-cyan-700 rounded-lg pt-6 bg-gray-800 '></div>
                  
                    <div className='flex flex-col gap-6'>
                    
                        <div className='w-[700px] relative top-4 left-44 h-[250px] ml-12 pt-6'>
                            {weatherData ? (
                                <div className='flex justify-between gap-4'>
                                    <div className='flex flex-col gap-4'>
                                        <h2 className='text-6xl font-bold text-cyan-700 ml-20'>{weatherData.name}</h2>
                                        {weatherData.main && (
                                            <>
                                                <p className='text-lg text-orange-300 ml-20 -mt-4'>Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</p>
                                                <p className='text-4xl font-mono font-bold text-orange-700 mt-12 ml-20 '>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                                            </>
                                        )}
                                    </div>
                                    <div className='w-28 h-28 rounded-full border bg-orange-700 border-orange-700 shadow-xl shadow-orange-700 relative top-16 right-44'>
                                        <div className='flex justify-center gap-8 text-cyan-700 font-bold text-6xl '>
                                            <span>.</span>
                                            <span>.</span>
                                        </div>
                                        <div className='w-12 h-2 border-b-4 border-l-4 border-r-4 border-cyan-700 relative top-3 left-8 rounded-3xl '></div>
                                    </div>
                                </div>
                            ) : (
                                error && <p className='text-xl text-red-500'>{error}</p>
                            )}
                        </div>
                        {weatherData && weatherData.main && (
                            <div className='w-[700px] relative top-4 left-44 h-[150px] rounded-3xl shadow-xl shadow-cyan-700 ml-12 pt-6 bg-gray-800 flex justify-center gap-20 p-4'>
                                <div className='space-y-8'>
                                    <p className='text-lg text-cyan-700 font-bold text-xl '> {weatherData.main.pressure} hPa</p>
                                    <p className='text-lg text-cyan-700 font-bold text-xl'> {weatherData.main.humidity}%</p>
                                </div>
                                <p className='text-lg text-cyan-700 font-bold text-xl mt-10'> {weatherData.visibility} meters</p>
                                <div className='space-y-8'>
                                    <p className='text-lg text-cyan-700 font-bold text-xl'>{weatherData.wind.speed} m/s, </p>
                                    <p className='text-lg text-cyan-700 font-bold text-xl'> {weatherData.wind.deg}°, </p>
                                </div>
                            </div>
                        )}
                        {weatherData && (
                            <div className='w-[700px] relative top-4 left-44 h-[150px] rounded-3xl shadow-xl shadow-cyan-700 ml-12 pt-6 bg-gray-800 flex justify-center gap-12 items-center'>
                                <p className='text-lg text-cyan-700 font-bold text-xl '> {weatherData.coord.lat}, {weatherData.coord.lon}</p>
                                <p className='text-lg text-cyan-700 font-bold text-xl '> {weatherData.weather[0].main} - {weatherData.weather[0].description}</p>
                                <p className='text-lg text-cyan-700 font-bold text-xl '>{(weatherData.main.temp_min - 273.15).toFixed(2)}°C / {(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
                            </div>
                        )}
                    </div>
                    <div className='w-[300px] relative top-4 left-44 h-[598px] rounded-3xl shadow-xl shadow-cyan-700 ml-12 pt-6 bg-gray-800 flex flex-col justify-center gap-12 pl-4 text-cyan-700 font-bold'>
                        {weatherData && weatherData.rain && <p className='text-3xl'>Rain Volume (last 1h): {weatherData.rain["1h"]} mm</p>}
                        {weatherData && (
                            <>
                                <p className='text-2xl '>Cloudiness: {weatherData.clouds.all}%</p>
                                <p className='text-2xl'>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                                <p className='text-2xl '>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()} </p>
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
