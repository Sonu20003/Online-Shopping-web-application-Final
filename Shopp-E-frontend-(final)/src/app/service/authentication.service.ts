import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //Spring Boot REST-API end points
  private apiUrl = 'http://localhost:8088/product_db/api/users/register';
  private apiUrl1 = 'http://localhost:8088/product_db/api/users/login';
  private apiUrl2 = 'http://localhost:8088/producthive/api/dealers';


  constructor(private http: HttpClient, private router: Router) { }


  registerDealer(dealerData: any): Observable<string> {
    return this.http.post(this.apiUrl, dealerData, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  login(loginData: any): Observable<string> {
  return this.http.post(this.apiUrl1, loginData, { responseType: 'text' })
    .pipe(
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Login failed. Please try again later.'));
      })
    );
  }
  // Method to fetch dealer data from the Spring Boot API
  getDealerInfo(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // BehaviorSubject to track user email
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();  // Observable to subscribe to email


  // Session
  /*
 * A session is a group of user interactions with your website that take place 
  within a given time frame. 
 * For example a single session can contain multiple page views, events, 
  social interactions, and ecommerce transactions.

  Sessionstorage is a predefined Object, allows us to store data in key/value pairs in the browser.
  The data which we save in session storage will only be persisted in the current browser tab. 
  If we close the current tab or browser window, the saved data in session storage will be cleared.
 * */



  // Session management: Save session data (token, etc.) 
  setSession(token: string, email: string): void {
    sessionStorage.setItem('authToken', token);  // Save token in localStorage
    sessionStorage.setItem('userEmail', email); // Store email in localStorage
    console.log('Token stored:', sessionStorage.getItem('authToken'));  // Debugging
    console.log('Email stored:', sessionStorage.getItem('userEmail'));  // Debugging

    // Update BehaviorSubject so subscribers get the latest email
    this.userNameSubject.next(email);
  }

  // Check if a session exists
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      let token = sessionStorage.getItem('authToken');
      console.log('Token :' + token);
      return token !== null;
    }
    return false;  // Return false if window is not available
  }

  getLoggedInUserName() {
    return this.userNameSubject.value;
  }

  // Logout functionality: Clear session data
  logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('authToken');  // Clear token from localStorage
      sessionStorage.removeItem('userEmail');  // Clear email from sessionStorage

      // Reset BehaviorSubject after logout
      this.userNameSubject.next('');
    }

  }

}
