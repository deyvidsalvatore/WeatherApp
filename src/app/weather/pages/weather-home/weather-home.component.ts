import { WeatherData } from './../../shared/interfaces/weather-data.interface';
import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-home',
  standalone: true,
  imports: [],
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.scss',
  providers: [WeatherService]
})
export class WeatherHomeComponent implements OnInit {

  private _weatherService: WeatherService = inject(WeatherService);

  initialName: string = "Brasilia";

  weatherData?: WeatherData;
  ngOnInit(): void {
    this.getWeatherDatas(this.initialName);
  }

  getWeatherDatas(cityName: string): void {
    this._weatherService.getWeatherDatas(cityName)
      .subscribe({
        next: (response) => {
          response && (this.weatherData = response);
          console.log(this.weatherData);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
