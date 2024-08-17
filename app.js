class units {
    constructor(system) {
        switch (system) {
            case 'metric':
                this.temperature = '°C';
                this.feelingTemperature = '°C';
                this.humidity = '%';
                this.cloudCovering = '%';
                this.windspeed = 'm/s';
            break;
            case 'us':
                this.temperature = '°F';
                this.feelingTemperature = '°F';
                this.humidity = '%';
                this.cloudCovering = '%';
                this.windspeed = 'mph';
            break;
            case 'uk':
                this.temperature = '°C';
                this.feelingTemperature = '°C';
                this.humidity = '%';
                this.cloudCovering = '%';
                this.windspeed = 'mph';
            break;
            default:
            break;
        }
    }
}

async function getData(location, unitGroup) {
    let query = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ location
        + '?unitGroup=' + unitGroup
        + '&include=current'
        + '&key=FDCJ4V5ZVQ4H4QTEH4DRQ6FKF';

    try {
        data = await fetch(query, {
            mode: 'cors',
        });
        data = await data.json();
    } catch (error) {
        console.log(error);
    }

    return data;
}

function setInfo(data, units) {
        console.log(units);
        document.getElementById('locationNameValue').innerHTML = data['resolvedAddress'];
        document.getElementById('timeValue').innerHTML = data['currentConditions']['datetime'];
        document.getElementById('temperatureValue').innerHTML = data['currentConditions']['temp'] + units.temperature;
        document.getElementById('feelingTempValue').innerHTML = data['currentConditions']['feelslike'] + units.feelingTemperature;
        document.getElementById('humidityValue').innerHTML = data['currentConditions']['humidity'] + units.humidity;
        document.getElementById('cloudCoveringValue').innerHTML = data['currentConditions']['cloudcover'] + units.cloudCovering;
        document.getElementById('windspeedValue').innerHTML = data['currentConditions']['windspeed'] + units.windspeed;
}

let _units = new units('metric');

getData('cancun', 'metric').then((data) => {
    setInfo(data, _units);
});

let inputLocation = document.getElementById('locationInput');
let unitGroup = document.getElementById('units');
let queryButton = document.getElementById('submitLocationButton');

unitGroup.addEventListener('change', () => {
    _units = new units(unitGroup.value);
});

queryButton.addEventListener('click', () => {
    _data = getData(inputLocation.value, unitGroup.value).then((data) => {
        setInfo(data, _units);
    }).catch((error) => {
        alert('Location not found');
        console.log(error);
    });
});

