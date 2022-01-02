import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'Organizer';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllOrganizer() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllOrganizers")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetOrganizerByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetOrganizerByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateOrganizer(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddOrganizer" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateOrganizer(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateOrganizer" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteOrganizer(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteOrganizer"}/${id}`).pipe(
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
