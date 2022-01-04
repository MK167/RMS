import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PGServicesService {
  readonly baseUrl = environment.baseUrl;
  
  apiUrlTable: string = 'ActiveProgram';
  apiUrlTableInActivePorgramProfessionalDiploma: string ='InActivePorgramProfessionalDiploma';
  apiUrlTableScientificResearch: string ='ScientificResearch';
  apiUrlTableSummitionProgram: string ='SummitionProgram';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllActiveProgram(id: any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetAllActiveProgram"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetActiveProgramByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetActiveProgramByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateActiveProgram(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddActiveProgram" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateActiveProgram(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateActiveProgram" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteActiveProgram(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteActiveProgram"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  // Get All //////////////////////////////////
  GetAllInActivePorgramProfessionalDiploma(flagType: any ,id: any) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableInActivePorgramProfessionalDiploma + "/GetAllInActivePorgramProfessionalDiploma"}/${flagType}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetInActivePorgramProfessionalDiplomaByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableInActivePorgramProfessionalDiploma + "/GetInActivePorgramProfessionalDiplomaByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateInActivePorgramProfessionalDiploma(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableInActivePorgramProfessionalDiploma + "/AddInActivePorgramProfessionalDiploma" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateInActivePorgramProfessionalDiploma(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableInActivePorgramProfessionalDiploma + "/UpdateInActivePorgramProfessionalDiploma" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteInActivePorgramProfessionalDiploma(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableInActivePorgramProfessionalDiploma + "/DeleteInActivePorgramProfessionalDiploma"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

//Get All
GetAllScientificResearch(id: any) : Observable<any> { 
  return this.httpClient.get(`${this.baseUrl + this.apiUrlTableScientificResearch + "/GetAllScientificResearch"}/${id}`)
  .pipe(
    catchError(this.handleError)
  );
}

// Get by ID ///////////////////////////////
GetScientificResearchByID(id: any): Observable<any> {
  return this.httpClient.get(`${this.baseUrl + this.apiUrlTableScientificResearch + "/GetScientificResearchByID"}/${id}`).pipe(
    catchError(this.handleError)
  );
}

//Create / Add
CreateScientificResearch(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl  + this.apiUrlTableScientificResearch + "/AddScientificResearch" , data).pipe(
    catchError(this.handleError)
  );
}

// Edit/ Update 
UpdateScientificResearch(id): Observable<any> {
  return this.httpClient.put(this.baseUrl  + this.apiUrlTableScientificResearch + "/UpdateScientificResearch" , id).pipe(
    catchError(this.handleError)
  );
}

// Delete
DeleteScientificResearch(id: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableScientificResearch + "/DeleteScientificResearch"}/${id}`).pipe(
    catchError(this.handleError)
  );
}

//Get All
GetAllSummitionProgram(id: any) : Observable<any> { 
  return this.httpClient.get(`${this.baseUrl + this.apiUrlTableSummitionProgram + "/GetAllSummitionProgram"}/${id}`)
  .pipe(
    catchError(this.handleError)
  );
}

// Get by ID ///////////////////////////////
GetSummitionProgramByID(id: any): Observable<any> {
  return this.httpClient.get(`${this.baseUrl + this.apiUrlTableSummitionProgram + "/GetSummitionProgramByID"}/${id}`).pipe(
    catchError(this.handleError)
  );
}

//Create / Add
CreateSummitionProgram(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl  + this.apiUrlTableSummitionProgram + "/AddSummitionProgram" , data).pipe(
    catchError(this.handleError)
  );
}

// Edit/ Update 
UpdateSummitionProgram(id): Observable<any> {
  return this.httpClient.put(this.baseUrl  + this.apiUrlTableSummitionProgram + "/UpdateSummitionProgram" , id).pipe(
    catchError(this.handleError)
  );
}

// Delete
DeleteSummitionProgram(id: any): Observable<any> {
  return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableSummitionProgram + "/DeleteSummitionProgram"}/${id}`).pipe(
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


