import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';

//Service Layer which interacts with REST Api

/**
 * Angular makes use of observables as an interface to handle a variety of common
 * asynchronous operations.
 * You can define custom events that send observable output data from a child to a parent component.
  The HTTP module uses observables to handle AJAX requests and responses.
  The Router and Forms modules use observables to listen for and respond to user-input events.
 */

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Handle errors globally
  private handleError1(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  // Return an observable with a user-facing error message
  }

  baseURL = 'http://localhost:8088/producthive/api/products';

  constructor(private http: HttpClient) { }

  //makes GET request to Spring Boot rest-api
  getProductList(): Observable<any> {
    return this.http.get(this.baseURL)
      .pipe(
        catchError(this.handleError1)  // Handle errors
      );
  }



  //makes POST request to add new Product
  newProduct(product: Object): Observable<Object> {
    console.log(product);
    return this.http.post(`${this.baseURL}`, product)
      .pipe(
        catchError(this.handleError1)  // Handle errors
      );
  }

  getSingleProduct(pid: number): Observable<any> {

    return this.http.get(`${this.baseURL}/${pid}`)
      .pipe(
        catchError(this.handleError1)  // Handle errors
      );
  }

  updateProduct(pid: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseURL}/${pid}`, value)
      .pipe(
        catchError(this.handleError1)  // Handle errors
      );
  }

  deleteProduct(pid: number): Observable<any> {
    return this.http.delete(this.baseURL + '/' + pid, { responseType: 'text' })
      .pipe(
        catchError(this.handleError1)  // Handle errors
      );
  }


  baseURL2 = 'http://localhost:8088/producthive/api'

  // Angular service method
  searchProductByName(name: string): Observable<any> {
    const url = `${this.baseURL2}/search?name=${name}`;
    return this.http.get(url).pipe(
      catchError(this.handleError) // Handle errors if any
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('Error searching for products:', error);
    return throwError(() => new Error('Error searching for products'));
  }

}
