import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'Gender';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllGender() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllGenders")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetGenderByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetGenderByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateGender(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddGender" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateGender(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateGender" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteGender(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteGender"}/${id}`).pipe(
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


