import { Component, HostListener } from '@angular/core';

interface Plan {
  svgCode: string,
  name: string,
}

@Component({
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  styleUrls: ['./multi-step-form.component.scss']
})
export class MultiStepFormComponent {
  currentStep = 1;
  totalSteps = 4;
  steps: {number: number, label: string}[] = [];
  plans: any = [];
  addOns: any = [];
  readonly YEARLY_DISCOUNT = '2 months free';
  selectedBilling = 'Yearly';
  screenWidth: any;
  submitted = false;


  ngOnInit(): void {
    this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log(this.screenWidth)
    this.steps = [
      {
        number: 1,
        label: 'YOUR INFO'
      },
      {
        number: 2,
        label: 'SELECT PLAN'
      },
      {
        number: 3,
        label: 'ADD-ONS'
      },
      {
        number: 4,
        label: 'SUMMARY'
      },
    ]

    this.plans = [
      {
        svgCode: '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fill-rule="evenodd"><circle cx="20" cy="20" r="20" fill="#FFAF7E"/><path fill="#FFF" fill-rule="nonzero" d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"/></g></svg>',
        name: 'Arcade',
        billing: [
          { type: 'Monthly', amount: 9 },
          { type: 'Yearly', amount: 90 }
        ]
      },
      {
        svgCode: '',
        name: 'Advanced',
        billing: [
          { type: 'Monthly', amount: 12 },
          { type: 'Yearly', amount: 120 }
        ]
      },
      {
        svgCode: '',
        name: 'Pro',
        billing: [
          { type: 'Monthly', amount: 15 },
          { type: 'Yearly', amount: 150 }
        ]
      }
    ]

    this.addOns = [
      {
        name: 'Online Service',
        description: 'Access to multiplayer games',
        billing: [
          { type: 'Monthly', amount: 1 },
          { type: 'Yearly', amount: 10 }
        ]
      },
      {
        name: 'Larger Storage',
        description: 'Extra 1TB of cloud save',
        billing: [
          { type: 'Monthly', amount: 1 },
          { type: 'Yearly', amount: 20 }
        ]
      },
      {
        name: 'Customizable profile',
        description: 'Custom theme on your profile',
        billing: [
          { type: 'Monthly', amount: 2 },
          { type: 'Yearly', amount: 20 }
        ]
      },
    ]
  }

  isScreenSmall(): boolean {
    return window.innerWidth < 768;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Trigger change detection on window resize
    this.isScreenSmall();
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm(): void {
    this.submitted = true;
    this.currentStep = 5;
  }

}
