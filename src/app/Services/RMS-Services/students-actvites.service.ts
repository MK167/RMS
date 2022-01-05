import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsActvitesService {
  readonly baseUrl = environment.baseUrl;

  apiUrlTable: string = 'ActivityType';
  apiUrlTableStudentActivities: string = 'StudentActivities';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllActivityType(id :any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetAllActivityType"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetActivityTypeByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetActivityTypeByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateActivityType(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddActivityType" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateActivityType(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateActivityType" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteActivityType(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteActivityType"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


////////////////// Students Activites ///////////////////
//Get All
  GetAllStudentActivities(flag: number, id: any ): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudentActivities + "/GetAllStudentActivities"}/${flag}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetStudentActivitiesByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudentActivities + "/GetStudentActivitiesByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateStudentActivities(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableStudentActivities + "/AddStudentActivities" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateStudentActivities(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableStudentActivities + "/UpdateStudentActivities" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteStudentActivities(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableStudentActivities + "/DeleteStudentActivities"}/${id}`).pipe(
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
