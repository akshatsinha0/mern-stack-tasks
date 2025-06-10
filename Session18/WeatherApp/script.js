class WeatherApp {
    constructor() {
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast';
        this.geocodingUrl = 'https://api.open-meteo.com/v1/search';
        this.currentLocation = { lat: 25.4358, lon: 81.8463 }; // Default: Allahabad
        this.currentCity = 'Allahabad';
        
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.updateDateTime();
        this.loadWeatherData();
        
        // Update time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    bindEvents() {
        const searchBtn = document.getElementById('searchBtn');
        const locationInput = document.getElementById('locationInput');
        
        searchBtn.addEventListener('click', () => this.handleSearch());
        locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        // Get user's current location
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.currentLocation = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                    this.loadWeatherData();
                },
                (error) => {
                    console.log('Geolocation error:', error);
                    // Use default location
                }
            );
        }
    }

    async handleSearch() {
        const locationInput = document.getElementById('locationInput');
        const query = locationInput.value.trim();
        
        if (!query) return;
        
        try {
            this.showLoading();
            const coordinates = await this.geocodeLocation(query);
            
            if (coordinates) {
                this.currentLocation = coordinates;
                this.currentCity = coordinates.name;
                await this.loadWeatherData();
                locationInput.value = '';
            } else {
                this.showError('Location not found. Please try again.');
            }
        } catch (error) {
            console.error('Search error:', error);
            this.showError('Error searching for location.');
        }
    }

    async geocodeLocation(query) {
        try {
            const response = await fetch(`${this.geocodingUrl}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                return {
                    lat: result.latitude,
                    lon: result.longitude,
                    name: result.name,
                    country: result.country
                };
            }
            
            return null;
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }

    async loadWeatherData() {
        try {
            this.showLoading();
            
            const weatherParams = new URLSearchParams({
                latitude: this.currentLocation.lat,
                longitude: this.currentLocation.lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
                hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max',
                timezone: 'auto',
                forecast_days: 3
            });

            const response = await fetch(`${this.apiUrl}?${weatherParams}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.updateWeatherDisplay(data);
            this.hideLoading();
            
        } catch (error) {
            console.error('Weather API error:', error);
            this.showError('Unable to fetch weather data. Please try again.');
        }
    }

    updateWeatherDisplay(data) {
        const current = data.current;
        const hourly = data.hourly;
        const daily = data.daily;
        
        // Update current weather
        document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}°`;
        document.getElementById('cityName').textContent = this.currentCity;
        document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
        document.getElementById('windSpeed').textContent = `${Math.round(current.wind_speed_10m)} km/h`;
        document.getElementById('feelsLike').textContent = `${Math.round(current.apparent_temperature)}°`;
        document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;
        document.getElementById('visibility').textContent = `${Math.round(15 - current.cloud_cover / 10)} km`;
        document.getElementById('uvIndex').textContent = daily.uv_index_max[0] || '3';
        
        // Update weather icon and description
        const weatherCode = current.weather_code;
        const isDay = current.is_day;
        const { icon, description } = this.getWeatherIcon(weatherCode, isDay);
        
        document.getElementById('weatherIcon').className = icon;
        document.getElementById('weatherDescription').textContent = description;
        
        // Update hourly forecast
        this.updateHourlyForecast(hourly);
    }

    updateHourlyForecast(hourly) {
        const container = document.querySelector('.hourly-container');
        container.innerHTML = '';
        
        // Show next 12 hours
        for (let i = 1; i <= 12; i++) {
            const time = new Date(hourly.time[i]);
            const temp = Math.round(hourly.temperature_2m[i]);
            const weatherCode = hourly.weather_code[i];
            const { icon } = this.getWeatherIcon(weatherCode, true);
            
            const hourlyItem = document.createElement('div');
            hourlyItem.className = 'hourly-item';
            hourlyItem.innerHTML = `
                <div class="hourly-time">${time.getHours()}:00</div>
                <div class="hourly-icon"><i class="${icon}"></i></div>
                <div class="hourly-temp">${temp}°</div>
            `;
            
            container.appendChild(hourlyItem);
        }
    }

    getWeatherIcon(weatherCode, isDay = true) {
        const weatherMap = {
            0: { icon: isDay ? 'fas fa-sun' : 'fas fa-moon', description: 'Clear sky' },
            1: { icon: isDay ? 'fas fa-sun' : 'fas fa-moon', description: 'Mainly clear' },
            2: { icon: 'fas fa-cloud-sun', description: 'Partly cloudy' },
            3: { icon: 'fas fa-cloud', description: 'Overcast' },
            45: { icon: 'fas fa-smog', description: 'Fog' },
            48: { icon: 'fas fa-smog', description: 'Depositing rime fog' },
            51: { icon: 'fas fa-cloud-drizzle', description: 'Light drizzle' },
            53: { icon: 'fas fa-cloud-drizzle', description: 'Moderate drizzle' },
            55: { icon: 'fas fa-cloud-drizzle', description: 'Dense drizzle' },
            61: { icon: 'fas fa-cloud-rain', description: 'Slight rain' },
            63: { icon: 'fas fa-cloud-rain', description: 'Moderate rain' },
            65: { icon: 'fas fa-cloud-showers-heavy', description: 'Heavy rain' },
            71: { icon: 'fas fa-snowflake', description: 'Slight snow' },
            73: { icon: 'fas fa-snowflake', description: 'Moderate snow' },
            75: { icon: 'fas fa-snowflake', description: 'Heavy snow' },
            77: { icon: 'fas fa-snowflake', description: 'Snow grains' },
            80: { icon: 'fas fa-cloud-rain', description: 'Slight rain showers' },
            81: { icon: 'fas fa-cloud-rain', description: 'Moderate rain showers' },
            82: { icon: 'fas fa-cloud-showers-heavy', description: 'Violent rain showers' },
            85: { icon: 'fas fa-snowflake', description: 'Slight snow showers' },
            86: { icon: 'fas fa-snowflake', description: 'Heavy snow showers' },
            95: { icon: 'fas fa-thunderstorm', description: 'Thunderstorm' },
            96: { icon: 'fas fa-thunderstorm', description: 'Thunderstorm with slight hail' },
            99: { icon: 'fas fa-thunderstorm', description: 'Thunderstorm with heavy hail' }
        };
        
        return weatherMap[weatherCode] || { icon: 'fas fa-cloud', description: 'Unknown' };
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        
        const timeString = now.toLocaleString('en-US', options);
        document.getElementById('currentTime').textContent = timeString;
    }

    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('weatherContent').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('weatherContent').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';
    }

    showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('weatherContent').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
        document.querySelector('#errorMessage p').textContent = message;
    }
}

// Enhanced error handling and performance optimization
class ErrorHandler {
    static handle(error, context = '') {
        console.error(`Error in ${context}:`, error);
        
        // Send error to analytics service (if implemented)
        if (window.gtag) {
            window.gtag('event', 'exception', {
                description: `${context}: ${error.message}`,
                fatal: false
            });
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    static startTiming(label) {
        performance.mark(`${label}-start`);
    }
    
    static endTiming(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
        
        const measure = performance.getEntriesByName(label)[0];
        console.log(`${label} took ${measure.duration.toFixed(2)}ms`);
    }
}

// Initialize the weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    PerformanceMonitor.startTiming('app-initialization');
    
    try {
        const app = new WeatherApp();
        PerformanceMonitor.endTiming('app-initialization');
    } catch (error) {
        ErrorHandler.handle(error, 'App Initialization');
    }
});

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add touch gestures for mobile devices
class TouchGestureHandler {
    constructor() {
        this.startY = 0;
        this.startX = 0;
        this.init();
    }
    
    init() {
        const weatherCard = document.querySelector('.weather-card');
        
        weatherCard.addEventListener('touchstart', (e) => {
            this.startY = e.touches[0].clientY;
            this.startX = e.touches[0].clientX;
        });
        
        weatherCard.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endX = e.changedTouches[0].clientX;
            
            const diffY = this.startY - endY;
            const diffX = this.startX - endX;
            
            // Swipe down to refresh
            if (diffY < -100 && Math.abs(diffX) < 50) {
                const app = new WeatherApp();
                app.loadWeatherData();
            }
        });
    }
}

// Initialize touch gestures
document.addEventListener('DOMContentLoaded', () => {
    if ('ontouchstart' in window) {
        new TouchGestureHandler();
    }
});
