import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WeatherData } from './../../shared/interfaces/weather-data.interface';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subject, takeUntil } from 'rxjs';

import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from "../../components/weather-card/weather-card.component";
@Component({
  selector: 'app-weather-home',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule, WeatherCardComponent],
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.scss',
  providers: [WeatherService]
})
export class WeatherHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  private _weatherService: WeatherService = inject(WeatherService);

  public readonly searchIcon = faSearch;

  initialCityName: string = "Brasilia";

  weatherData?: WeatherData;

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  ngOnDestroy(): void {
    this.initialCityName = '';

    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  getWeatherDatas(cityName: string): void {
    this._weatherService.getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
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
