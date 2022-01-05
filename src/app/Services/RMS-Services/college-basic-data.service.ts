import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollegeBasicDataService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'College';
  apiUrlTableMajor: string ='Major';
  apiUrlTableProgram: string ='Program';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllCollege(id: any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable+ "/GetAllCollege"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetCollegeByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetCollegeByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateCollege(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddCollege" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateCollege(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateCollege" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteCollege(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteCollege"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  ////////////////////////////////////////////////////
  //// Majors ///////////////////////////////////////
  
  //Get All
  GetAllMajor(id :any ) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableMajor+ "/GetAllMajor"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetMajorByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableMajor + "/GetMajorByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateMajor(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableMajor + "/AddMajor" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateMajor(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableMajor + "/UpdateMajor" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteMajor(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableMajor + "/DeleteMajor"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  ///////////////////////////////////////////////////
  ///////////////// Programs ///////////////////////

  //Get All
  GetAllProgram(id :any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableProgram+ "/GetAllProgram"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetProgramByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableProgram + "/GetProgramByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateProgram(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableProgram + "/AddProgram" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateProgram(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableProgram + "/UpdateProgram" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteProgram(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableProgram + "/DeleteProgram"}/${id}`).pipe(
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


