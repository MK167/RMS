import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IEventAttendanceDTO } from './../../../Models/IEventAttendanceDTO';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})


export class EventAttendanceService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'EventAttendance';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllEventAttendance() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllEventAttendances")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetEventAttendanceByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetEventAttendanceByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateEventattendance(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddEventAttendance" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateEventAttendance(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateEventAttendance" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteEventattendance(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteEventAttendance"}/${id}`).pipe(
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


