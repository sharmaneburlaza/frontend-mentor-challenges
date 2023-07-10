import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import { getElementsDynamicStyles, getGeneralDynamicStyles } from '../utils';

enum Region {
  AFRICA = 'Africa',
  AMERICA = 'America',
  ASIA = 'Asia',
  EUROPE = 'Europe',
  OCEANIA = 'Oceania'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('elementRef', { static: false }) elementRef: ElementRef | undefined;
  @ViewChildren('multipleElements') multipleElements: QueryList<ElementRef> | undefined;
  regions: any;
  selectedRegion = '';
  countries: any;
  searchQuery = '';
  darkModeState: any = '';

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(data => {
      this.countries = data;
    })

    this.regions = [
      { name: Region.AFRICA },
      { name: Region.AMERICA },
      { name: Region.ASIA },
      { name: Region.EUROPE },
      { name: Region.OCEANIA },
    ]
  }

  ngAfterViewChecked() {
    this.darkModeState = localStorage.getItem('darkModeState');
    if (this.elementRef) {
      const element = this.elementRef.nativeElement;
        getGeneralDynamicStyles(this.darkModeState, element);
    }
    if (this.multipleElements) {
      this.multipleElements.forEach(el => {
        const element = el.nativeElement;
        getElementsDynamicStyles(this.darkModeState, element);
      })
    }
  }

  onSearchChange(event: any) {

  }

  onRegionSelectChange(event: any) {
    console.log(this.selectedRegion)
  }

  onCardClick(event: Event, country: any) {
    localStorage.setItem('selectedCountry', country.name);
    this.router.navigate(['rest-countries/detail/' + country.name]);
  }

  handleValueChange(event: any) {
    this.darkModeState = event;
  }
}
