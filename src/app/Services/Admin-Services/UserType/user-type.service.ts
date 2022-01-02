import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'UserType';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllUserType() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllUserTypes")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetUserTypeByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetUserTypeByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateUserType(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddUserType" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateUserType(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateUserType" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteUserType(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteUserType"}/${id}`).pipe(
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

