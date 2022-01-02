import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventDetailsService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'EventDetails';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllEventDetails() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllEventDetailss")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetEventDetailsByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetEventDetailsByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateEventDetails(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddEventDetails" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateEventAttendance(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateEventDetails" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteEventDetails(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteEventDetails"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}


