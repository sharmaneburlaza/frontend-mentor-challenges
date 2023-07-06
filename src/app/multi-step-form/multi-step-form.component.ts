import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Plan {
  svgCode: string,
  name: string,
}

const MONTHLY = 'Monthly';
const YEARLY = 'Yearly';

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
  readonly INPUT_ERROR = 'This field is required.'
  selectedBilling = YEARLY;
  billing = 'year';
  selectedPlanIndex = -1;
  planError = '';
  isYearly = true;
  screenWidth: any;
  submitted = false;
  form: any;
  isNextButtonClicked = false;

  constructor(private fb: FormBuilder) {}

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
          { type: MONTHLY, amount: 9 },
          { type: YEARLY, amount: 90 }
        ]
      },
      {
        svgCode: '',
        name: 'Advanced',
        billing: [
          { type: MONTHLY, amount: 12 },
          { type: YEARLY, amount: 120 }
        ]
      },
      {
        svgCode: '',
        name: 'Pro',
        billing: [
          { type: MONTHLY, amount: 15 },
          { type: YEARLY, amount: 150 }
        ]
      }
    ]

    this.addOns = [
      {
        name: 'Online Service',
        description: 'Access to multiplayer games',
        billing: [
          { type: MONTHLY, amount: 1 },
          { type: YEARLY, amount: 10 }
        ],
        selected: false
      },
      {
        name: 'Larger Storage',
        description: 'Extra 1TB of cloud save',
        billing: [
          { type: MONTHLY, amount: 1 },
          { type: YEARLY, amount: 20 }
        ],
        selected: false
      },
      {
        name: 'Customizable profile',
        description: 'Custom theme on your profile',
        billing: [
          { type: MONTHLY, amount: 2 },
          { type: YEARLY, amount: 20 }
        ],
        selected: false
      },
    ]

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', Validators.required],
    })
  }

  isScreenSmall(): boolean {
    return window.innerWidth < 996;
  }

  @HostListener('window:resize')
  onWindowResize() {
    // Trigger change detection on window resize
    this.isScreenSmall();
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.form.invalid) {
      this.isNextButtonClicked = true;
    } else if (this.currentStep === 2 && this.selectedPlanIndex < 0) {
      this.planError = 'No selected plan.'
    } else if (this.currentStep < this.totalSteps) {
      this.planError = '';
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

  onBillingToggleChange(): void {
    this.isYearly = !this.isYearly;
    this.selectedBilling = this.isYearly ? YEARLY : MONTHLY;
    this.billing = this.selectedBilling === YEARLY ? 'year' : 'month';
  }

  selectPlan(index: number) {
    this.selectedPlanIndex = index;
  }

  selectAddOn(addOn: any) {
    addOn.selected = !addOn.selected;
  }

  getTotalAmount(): string {
    const selectedPlan = this.plans[this.selectedPlanIndex];
    const planAmount = this.selectedBilling === MONTHLY ? selectedPlan.billing[0].amount : selectedPlan.billing[1].amount;
    const addOnsAmount = this.addOns.filter((a: any) => a.selected === true)
      .map((a: any) => {
        if (this.selectedBilling === MONTHLY) {
          return a.billing[0].amount;
        } else {
          return a.billing[1].amount;
        }
      })
      .reduce((accumulator: any, currentValue: any) => {
      return accumulator + currentValue;
      }, 0);
    
    const total = planAmount + addOnsAmount;

    return this.selectedBilling == MONTHLY ? `${total}/mo` : `${total}/yr`;
  }

}
