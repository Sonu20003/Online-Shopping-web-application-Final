import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';


@Component({
  selector: 'app-dealer-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dealer-registration.component.html',
  styleUrl: './dealer-registration.component.css'
})
export class DealerRegistrationComponent {
  dealerForm!: FormGroup;
  submitted = false;
  successMessage: string = ''; // Property to store success message

  // a form builder is a service that helps in building Reactive forms dynamically
  constructor(private formBuilder: FormBuilder,
    private router: Router,  // Inject Router
    private authenticationService: AuthenticationService) { }

  //build reactive form dynmically
  ngOnInit() {
    this.dealerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.minLength(10)]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required]
      })
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.dealerForm.controls;
  }

  // Getter for nested address form group
  get addressControls() {
    return (this.dealerForm.get('address') as FormGroup).controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.dealerForm.invalid) {
      return;
    }

    this.authenticationService.registerDealer(this.dealerForm.value).subscribe({
      next: (response: string) => {
        // Success case - display success message
        this.successMessage = response || 'User Registered Successfully';
        

        // Navigate to login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']); // Navigate to login component
        }, 3000); // 3 seconds delay
      },
      error: (error) => {
        console.error('Error registering User', error);
      }
    });
  }

}
