export interface Hour {
    air_quality: {
        co: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        us_epa_index: number;
        gb_defra_index: number;
    };
    chance_of_rain: number;
    chance_of_snow: number;
    cloud: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    time: string;
    time_epoch: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    will_it_rain: number;
    will_it_snow: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
}

export interface Forecast {
    date: string;
    date_epoch: number;
    day: {
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
            code: number;
            icon: string;
            text: string;
        };
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avghumidity: number;
        daily_chance_of_rain: number;
        daily_chance_of_snow: number;
        daily_will_it_rain: number;
        daily_will_it_snow: number;
        totalprecip_mm: number;
        totalprecip_in: number;
        totalsnow_cm: number;
        maxwind_mph: number;
        maxwind_kph: number;
        uv: number;
    };
    astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_sun_up: number;
        is_moon_up: number;
    };
    hour: Hour[];
}

export interface CurrentWeatherData {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
    };
    current: {
        air_quality: {
            co: number;
            no2: number;
            o3: number;
            so2: number;
            pm2_5: number;
            pm10: number;
            us_epa_index: number;
            gb_defra_index: number;
        };
        cloud: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        };
        feelslike_c: number;
        feelslike_f: number;
        gust_kph: number;
        gust_mph: number;
        humidity: number;
        is_day: number;
        last_updated: string;
        last_updated_epoch: number;
        precip_in: number;
        precip_mm: number;
        pressure_in: number;
        pressure_mb: number;
        temp_c: number;
        temp_f: number;
        uv: number;
        vis_km: number;
        vis_miles: number;
        wind_degree: number;
        wind_dir: string;
        wind_kph: number;
        wind_mph: number;
    };
    forecast: {
        forecastday: Forecast[];
    };
}
