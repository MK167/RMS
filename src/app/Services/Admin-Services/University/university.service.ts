import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'University';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllUniversity() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllUniversitys")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetUniversityByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetUniversityByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateUniversity(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddUniversity" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateUniversity(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateUniversity" , id).pipe(
      catchError(this.handleError)
    );
  }
  // Delete
  DeleteUniversity(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteUniversity"}/${id}`).pipe(
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
