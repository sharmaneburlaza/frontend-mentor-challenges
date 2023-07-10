import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { getGeneralDynamicStyles } from '../utils';

@Component({
  selector: 'rest-countries-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @ViewChild('elementRef', { static: false }) elementRef: ElementRef | undefined;
  countries: any = [];
  country: any;
  borderCountries: string[] = [];
  darkModeState: string | null | undefined;

  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const selectedCountry = localStorage.getItem('selectedCountry');
    this.countriesService.getCountries()
      .subscribe(data => {
        this.countries = Object.values(data);
        this.country = this.countries.filter((d: any) => d.name === selectedCountry)[0];
        this.getBorderCountries();
    })
  }

  getBorderCountries() {
    const borders: any = [];
    this.country.borders?.forEach((b: any) => {
      this.countries?.forEach((c: any) => {
        if (c.alpha3Code === b) {
          borders.push(c.name)
        }
      })
    })
    this.borderCountries = borders;
  }

  ngAfterViewChecked() {
    this.darkModeState = localStorage.getItem('darkModeState');
    if (this.elementRef) {
      const element = this.elementRef.nativeElement;
      if (this.darkModeState) {
        getGeneralDynamicStyles(this.darkModeState, element);
      }
    }
  }

  backToHome() {
    this.router.navigate(['rest-countries/home']);
  }

  handleValueChange(event: any) {
    this.darkModeState = event;
  }
}
