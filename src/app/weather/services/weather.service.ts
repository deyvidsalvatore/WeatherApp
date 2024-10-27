import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { WeatherData } from '../shared/interfaces/weather-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private _http: HttpClient = inject(HttpClient);

  getWeatherDatas(cityName: string): Observable<WeatherData> {
    return this._http.get<WeatherData>(
      `${environment.apiUrl}?q=${cityName}&units=metric&mode=json&APPID=${environment.apiKey}`,
      {}
    );
  }
}
