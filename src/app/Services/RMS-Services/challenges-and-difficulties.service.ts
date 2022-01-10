import { environment } from './../../../environments/environment.prod';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengesAndDifficultiesService {
  readonly baseUrl = environment.baseUrl;

  apiUrlTable: string = 'Challenges_and_Difficulties';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllChallenges_and_Difficulties(id): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable+ "/GetAllChallenges_and_Difficulties"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetChallenges_and_DifficultiesByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetChallenges_and_DifficultiesByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateChallenges_and_Difficulties(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddChallenges_and_Difficulties" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateChallenges_and_Difficulties(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateChallenges_and_Difficulties" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteChallenges_and_Difficulties(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteChallenges_and_Difficulties"}/${id}`).pipe(
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
