import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnviroService {

  readonly baseUrl = environment.baseUrl;

  apiUrlTable: string = 'Enviro';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllEnviro(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllEnvirobyID")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetEnviroByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetEnviroByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateEnviro(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddEnviro" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateEnviro(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateEnviro" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteEnviro(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteEnviro"}/${id}`).pipe(
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
