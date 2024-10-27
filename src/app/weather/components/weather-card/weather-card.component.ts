import { Component, Input, OnInit } from '@angular/core';
import { WeatherData } from '../../shared/interfaces/weather-data.interface';

import {
  faTint,
  faTemperatureLow,
  faTemperatureHigh,
  faWind,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [FontAwesomeModule, DecimalPipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent implements OnInit {
  @Input('weatherData') weatherData?: WeatherData;

  readonly minTemperatureIcon: IconDefinition = faTemperatureLow;
  readonly maxTemperatureIcon: IconDefinition = faTemperatureHigh;
  readonly humidityIcon: IconDefinition = faTint;
  readonly windIcon: IconDefinition = faWind;

  ngOnInit(): void {
    console.log();
  }

  getWeatherState(): string {
    if (!this.weatherData) return 'noData';

    const temp = this.weatherData.main.temp;

    switch (true) {
      case temp > 15:
        return 'warm';
      case temp <= 15:
        return 'cold';
      default:
        return 'noData';
    }
  }

}
