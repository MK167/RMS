import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HRService {
  readonly baseUrl = environment.baseUrl;

  apiUrlTable: string = 'AdminsPositions';
  apiUrlTableHR_AcademicStaff: string ='HR_AcademicStaff';
  apiUrlTableHR_AcademicStaffAll: string ='HR_AcademicStaffAll';
  apiUrlTableHR_CollegeAdmins: string ='HR_CollegeAdmins';
  apiUrlTableHR_HeadOfDepartments: string ='HR_HeadOfDepartments';
  apiUrlTableHR_ResearchUnits: string ='HR_ResearchUnits';
  apiUrlTableHR_TechnicalAndAdmin: string ='HR_TechnicalAndAdmin';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

//Get All
  GetAllAdminsPositions() : Observable<any> { 
    return this.httpClient.get(this.baseUrl + this.apiUrlTable + "/GetAllAdminsPositions")
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetAdminsPositionsByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + "/GetAdminsPositionsByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateAdminsPositions(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + "/AddAdminsPositions" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateAdminsPositions(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + "/UpdateAdminsPositions" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteAdminsPositions(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + "/DeleteAdminsPositions"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  // Get All //////////////////////////////////
  GetAllHR_AcademicStaff(id) : Observable<any> { 
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_AcademicStaff + "/GetAllHR_AcademicStaff"}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  //Get by ID
  GetHR_AcademicStaffByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_AcademicStaff + "/GetHR_AcademicStaffByID"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  //Create / Add
  CreateHR_AcademicStaff(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_AcademicStaff + "/AddHR_AcademicStaff" , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update 
  UpdateHR_AcademicStaff(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_AcademicStaff + "/UpdateHR_AcademicStaff" , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteHR_AcademicStaff(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_AcademicStaff + "/DeleteHR_AcademicStaff"}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


    // Get All //////////////////////////////////
    GetAllHR_AcademicStaffAll(id): Observable<any> {
      return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_AcademicStaffAll + "/GetAllHR_AcademicStaffAll"}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
    }

    //Get by ID
    GetHR_AcademicStaffAllByID(id: any): Observable<any> {
      return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_AcademicStaffAll + "/GetHR_AcademicStaffAllByID"}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    //Create / Add
    CreateHR_AcademicStaffAll(data: any): Observable<any> {
      return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_AcademicStaffAll + "/AddHR_AcademicStaffAll" , data).pipe(
        catchError(this.handleError)
      );
    }

    // Edit/ Update 
    UpdateHR_AcademicStaffAll(id): Observable<any> {
      return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_AcademicStaffAll + "/UpdateHR_AcademicStaffAll" , id).pipe(
        catchError(this.handleError)
      );
    }

    // Delete
    DeleteHR_AcademicStaffAll(id: any): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_AcademicStaffAll + "/DeleteHR_AcademicStaffAll"}/${id}`).pipe(
        catchError(this.handleError)
      );
    }


      // Get All //////////////////////////////////
      GetAllHR_CollegeAdmins(id) : Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_CollegeAdmins + "/GetAllHR_CollegeAdmins"}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
      }

      //Get by ID
      GetHR_CollegeAdminsByID(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_CollegeAdmins + "/GetHR_CollegeAdminsByID"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }

      //Create / Add
      CreateHR_CollegeAdmins(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_CollegeAdmins + "/AddHR_CollegeAdmins" , data).pipe(
          catchError(this.handleError)
        );
      }

      // Edit/ Update 
      UpdateHR_CollegeAdmins(id): Observable<any> {
        return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_CollegeAdmins + "/UpdateHR_CollegeAdmins" , id).pipe(
          catchError(this.handleError)
        );
      }

      // Delete
      DeleteHR_CollegeAdmins(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_CollegeAdmins + "/DeleteHR_CollegeAdmins"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }

      // Get All //////////////////////////////////
      GetAllHR_HeadOfDepartments(id) : Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_HeadOfDepartments + "/GetAllHR_HeadOfDepartments"}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
      }
  
      //Get by ID
      GetHR_HeadOfDepartmentsByID(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_HeadOfDepartments + "/GetHR_HeadOfDepartmentsByID"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }
  
      //Create / Add
      CreateHR_HeadOfDepartments(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_HeadOfDepartments + "/AddHR_HeadOfDepartments" , data).pipe(
          catchError(this.handleError)
        );
      }
  
      // Edit/ Update 
      UpdateHR_HeadOfDepartments(id): Observable<any> {
        return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_HeadOfDepartments + "/UpdateHR_HeadOfDepartments" , id).pipe(
          catchError(this.handleError)
        );
      }
  
      // Delete
      DeleteHR_HeadOfDepartments(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_HeadOfDepartments + "/DeleteHR_HeadOfDepartments"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }
      // Get All //////////////////////////////////
      GetAllHR_ResearchUnits(id) : Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_ResearchUnits + "/GetAllHR_ResearchUnits"}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
      }
  
      //Get by ID
      GetHR_ResearchUnitsByID(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_ResearchUnits + "/GetHR_ResearchUnitsByID"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }
  
      //Create / Add
      CreateHR_ResearchUnits(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_ResearchUnits + "/AddHR_ResearchUnits" , data).pipe(
          catchError(this.handleError)
        );
      }
  
      // Edit/ Update 
      UpdateHR_ResearchUnits(id): Observable<any> {
        return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_ResearchUnits + "/UpdateHR_ResearchUnits" , id).pipe(
          catchError(this.handleError)
        );
      }
  
      // Delete
      DeleteHR_ResearchUnits(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_ResearchUnits + "/DeleteHR_ResearchUnits"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }
  
      // Get All //////////////////////////////////
      GetAllHR_TechnicalAndAdmin(id) : Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_TechnicalAndAdmin + "/GetAllHR_TechnicalAndAdmin"}/${id}`)
        .pipe(
          catchError(this.handleError)
        );
      }
  
      //Get by ID
      GetHR_TechnicalAndAdminByID(id: any): Observable<any> {
        return this.httpClient.get(`${this.baseUrl + this.apiUrlTableHR_TechnicalAndAdmin + "/GetHR_TechnicalAndAdminByID"}/${id}`).pipe(
          catchError(this.handleError)
        );
      }
  
      //Create / Add
      CreateHR_TechnicalAndAdmin(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl  + this.apiUrlTableHR_TechnicalAndAdmin + "/AddHR_TechnicalAndAdmin" , data).pipe(
          catchError(this.handleError)
        );
      }
  
      // Edit/ Update 
      UpdateHR_TechnicalAndAdmin(id): Observable<any> {
        return this.httpClient.put(this.baseUrl  + this.apiUrlTableHR_TechnicalAndAdmin + "/UpdateHR_TechnicalAndAdmin" , id).pipe(
          catchError(this.handleError)
        );
      }

      // Delete
      DeleteHR_TechnicalAndAdmin(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableHR_TechnicalAndAdmin + "/DeleteHR_TechnicalAndAdmin"}/${id}`).pipe(
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


