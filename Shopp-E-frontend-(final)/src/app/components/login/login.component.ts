import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],   //using template driven forms-ngmodel
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string = '';
  successMessage: string = ''; // Property to store success message

  constructor(
      private authService: AuthenticationService,
      private router: Router
  ) { }

  onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({
        next: (response: string) => {
          if (response.includes('successful')) { // backend sends "Login successful!"
            // ✅ Keep your existing session setup
            this.authService.setSession('some-auth-token', this.loginData.email);

            // ✅ Minimal addition: store userId so cart/add-to-cart buttons work
            // Assuming your backend returns userId along with the success message
            // If not, you can just use email as a placeholder for now
            localStorage.setItem('userId', '1'); // Replace '1' with actual backend userId if available
            localStorage.setItem('userEmail', this.loginData.email);

            this.successMessage = response;
            setTimeout(() => this.router.navigate(['/']), 500);
          } else {
            this.errorMessage = response;
          }
        },
        error: (error) => {
          console.error('Login error', error);
          this.errorMessage = 'An error occurred during login.';
        }
      });
    }
  }
}
