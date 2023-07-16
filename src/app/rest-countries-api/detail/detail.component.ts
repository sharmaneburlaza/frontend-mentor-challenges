import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CountriesService } from 'src/app/rest-countries-api/services/countries.service';
import { getElementsDynamicStyles, getGeneralDynamicStyles } from '../utils';

@Component({
  selector: 'rest-countries-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @ViewChild('elementRef', { static: false }) elementRef: ElementRef | undefined;
  @ViewChildren('buttonElements') buttonElements: QueryList<ElementRef> | undefined;
  countries: any = [];
  country: any;
  borderCountries: string[] = [];
  darkModeState: any;

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const name = params['name'];
      this.getCountry(name);
    })
  }

  navigateCountry(countryName: string) {
    this.router.navigate(['rest-countries/detail/' + countryName]);
  }

  getCountry(name: string) {
    this.countriesService.getCountries()
      .subscribe(data => {
        this.countries = Object.values(data);
        this.country = this.countries.filter((d: any) => d.name === name)[0];
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
        getGeneralDynamicStyles(this.darkModeState, element);
    }
    if (this.buttonElements) {
      this.buttonElements.forEach(el => {
        const element = el.nativeElement;
        getElementsDynamicStyles(this.darkModeState, element);
      })
    }
  }

  goBack() {
    this.location.back();
  }

  handleValueChange(event: any) {
    this.darkModeState = event;
  }
}
