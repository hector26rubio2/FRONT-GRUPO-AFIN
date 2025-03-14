import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CountryService } from './services/country.service';
import { CountryDto } from './models/country-dto.model';

// Importaciones de PrimeNG
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RadioButtonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    MessageModule
  ]
})
export class AppComponent implements OnInit {
  searchForm: FormGroup;
  countries: CountryDto[] = [];
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private countryService: CountryService) {
    // Se crea el formulario reactivo
    this.searchForm = this.fb.group({
      searchType: ['all', Validators.required], // Opciones: 'all', 'region', 'name'
      searchValue: ['']
    });
  }

  ngOnInit(): void {
    // Carga inicial de todos los países
    this.loadCountries();
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: data => this.countries = data,
      error: () => this.errorMessage = 'Error al cargar los países.'
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    const { searchType, searchValue } = this.searchForm.value;

    if (searchType === 'all') {
      this.countryService.getAllCountries().subscribe({
        next: data => this.countries = data,
        error: () => this.errorMessage = 'Error al cargar los países.'
      });
    } else if (searchType === 'region') {
      if (!searchValue) {
        this.errorMessage = 'Ingrese la región';
        return;
      }
      this.countryService.getCountriesByRegion(searchValue).subscribe({
        next: data => this.countries = data,
        error: () => this.errorMessage = `Error al cargar los países de la región "${searchValue}".`
      });
    } else if (searchType === 'name') {
      if (!searchValue) {
        this.errorMessage = 'Ingrese el nombre o parte del nombre';
        return;
      }
      this.countryService.getCountriesByName(searchValue).subscribe({
        next: data => this.countries = data,
        error: () => this.errorMessage = `Error al buscar países con el nombre "${searchValue}".`
      });
    }
  }
}
