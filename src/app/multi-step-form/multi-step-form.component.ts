import { Component, HostListener } from '@angular/core';

interface Plan {
  icon: string,
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
  selectedBilling = 'Monthly';
  screenWidth: any;


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
        icon: '',
        name: 'Arcade',
        billing: [
          { type: 'Monthly', amount: 9 },
          { type: 'Yearly', amount: 90 }
        ]
      },
      {
        icon: '',
        name: 'Advanced',
        billing: [
          { type: 'Monthly', amount: 12 },
          { type: 'Yearly', amount: 120 }
        ]
      },
      {
        icon: '',
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

  }
}
