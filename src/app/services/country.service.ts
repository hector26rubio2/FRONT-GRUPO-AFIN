import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryDto } from '../models/country-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // Cambia la URL según la configuración de tu backend
  private baseUrl = 'https://localhost:7268/api/countries';

  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.baseUrl}`);
  }

  getCountriesByRegion(region: string): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.baseUrl}/region/${region}`);
  }

  getCountriesByName(name: string): Observable<CountryDto[]> {
    return this.http.get<CountryDto[]>(`${this.baseUrl}/name/${name}`);
  }
}
