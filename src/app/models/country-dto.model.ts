export interface CountryDto {
  name: string;
  region: string;
  population: number;
  languages: string[]; // Se espera un arreglo de nombres de lenguajes
  flag: string; // URL de la imagen de la bandera
}
