#!/usr/bin/env node

import axios from "axios";
import chalk from "chalk";
import boxen from "boxen";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const city = process.argv[2] || "Bengaluru";

const weatherIcons = {
  sunny: "☀️",
  clear: "☀️",
  clouds: "☁️",
  rain: "🌧️",
  drizzle: "🌦️",
  thunder: "⚡",
  storm: "🌩️",
  thunderstorm: "⛈️",
  snow: "❄️",
  snowy: "❄️",
  mist: "🌫️",
  fog: "🌫️",
  haze: "🌫️",
  foggy: "🌁",
  sleet: "🌨️",
  windy: "💨",
};

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const { data } = await axios.get(url);
    const location = `${data.name}, ${data.sys.country}`;
    const temperature = `${data.main.temp}°C`;
    const feelsLike = `${data.main.feels_like}°C`;
    const humidity = `${data.main.humidity}%`;
    const description = data.weather[0].description;
    const icon = weatherIcons[data.weather[0].main.toLowerCase()] || "🌤️";

    const output = `
${chalk.bold("📍 Location:")} ${chalk.cyan(location)}
${chalk.bold("🌡  Temperature:")} ${chalk.yellow(temperature)}
${chalk.bold("🤔 Feels Like:")} ${chalk.magenta(feelsLike)}
${chalk.bold("💧 Humidity:")} ${chalk.blue(humidity)}
${chalk.bold(`${icon}  Weather:`)} ${chalk.green(description)}`;

    console.log(
      boxen(output, {
        title: `Weather in ${city} 🌍`,
        titleAlignment: "center",
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "cyan",
        backgroundColor: "#1e1e1e",
      })
    );
  } catch (error) {
    console.log(chalk.red("❌ Error fetching weather data."));
  }
}

getWeather();
