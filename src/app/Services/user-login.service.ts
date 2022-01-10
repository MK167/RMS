import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  apiUrlTable: string = 'User';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllUser() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable + "/GetAllUser")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get UserData
  GetUserData(username: any, password: any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetUserData"}/${username}/${password}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetUserByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetUserByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateUser(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddUser" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateUser(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateUser" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteUser(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteUser"}/${id}`).pipe(
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