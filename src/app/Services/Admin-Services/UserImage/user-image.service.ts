import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class UserImageService {

  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'UserImage';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllUserImage() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable+ "/GetAllUserImages")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetUserImageByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetUserImageByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateUserImage(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddUserImage" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateUserImage(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateUserImage" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteUserImage(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteUserImage"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  //File Upload to Folder 
  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://127.0.0.1:8887/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .map(() => { return true; })
      .catch((e) => this.handleError(e));
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

