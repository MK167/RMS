import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcademicStructureService {
  readonly baseUrl = environment.baseUrl;
  //
  apiUrlTable = 'AcademicsStructure';
  apiUrlTableAccreditationRequirements = 'AccreditationRequirements';
  apiUrlTableAdvisor = 'Advisor';
  apiUrlTableAdvisorItems = 'AdvisorItems';
  //
  apiUrlTableCo_op = 'Co_op';
  apiUrlTableCorrectiveAction = 'CorrectiveAction';
  apiUrlTableCoursesCommitment = 'CoursesCommitment';
  apiUrlTableElectronicResources = 'ElectronicResources';
  apiUrlTableElectronicResourcesItem = 'ElectronicResourcesItem';
  apiUrlTableFieldTraining = 'FieldTraining';
  apiUrlTableInternationalAccreditation = 'InternationalAccreditation';
  apiUrlTableMoodle = 'Moodle';
  apiUrlTableNumberOfCourses = 'NumberOfCourses';
  apiUrlTableScientificDegrees = 'ScientificDegrees';
  apiUrlTableStudentsNumber = 'StudentsNumber';
  apiUrlTableStudentTransfer = 'StudentTransfer';
  apiUrlTableStudyPlan = 'StudyPlan';
  apiUrlTableStudyPlanItem = 'StudyPlanItem';
  apiUrlTableTeachingAndLearningMethods = 'TeachingAndLearningMethods';
  apiUrlTableTeachingAndLearningMethodsItem = 'TeachingAndLearningMethodsItem';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

////////////////////////////////////////////////////
//// AcademicsStructure ////////////////////////////

// Get All
  GetAllAcademicsStructure(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTable + '/GetAllAcademicsStructure')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetAcademicsStructureByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTable + '/GetAcademicsStructureByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateAcademicsStructure(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTable + '/AddAcademicsStructure' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateAcademicsStructure(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTable + '/UpdateAcademicsStructure' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteAcademicsStructure(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTable + '/DeleteAcademicsStructure'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  ////////////////////////////////////////////////////
  //// AccreditationRequirements ///////////////////////////////////////

  // Get All
  GetAllAccreditationRequirements(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableAccreditationRequirements + '/GetAllAccreditationRequirements')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetAccreditationRequirementsByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableAccreditationRequirements + '/GetAccreditationRequirementsByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateAccreditationRequirements(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableAccreditationRequirements + '/AddAccreditationRequirements' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateAccreditationRequirements(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableAccreditationRequirements + '/UpdateAcademicsStructure' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteAccreditationRequirements(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableAccreditationRequirements + '/DeleteAccreditationRequirements'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

 ///////////////////////////////////////////////////
  ///////////////// Advisors ///////////////////////

  // Get All
  GetAllAdvisor(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableAdvisor + '/GetAllAdvisor')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetAdvisorByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableAdvisor + '/GetAdvisorByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateAdvisor(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableAdvisor + '/AddAdvisor' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateAdvisor(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableAdvisor + '/UpdateAdvisor' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteAdvisor(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableAdvisor + '/DeleteAdvisor'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


   ///////////////////////////////////////////////////
  ///////////////// AdvisorItemss ///////////////////////

  // Get All
  GetAllAdvisorItems(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableAdvisorItems + '/GetAllAdvisorItems')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetAdvisorItemsByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableAdvisorItems + '/GetAdvisorItemsByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateAdvisorItems(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableAdvisorItems + '/AddAdvisorItems' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateAdvisorItems(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableAdvisorItems + '/UpdateAdvisorItems' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteAdvisorItems(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableAdvisorItems + '/DeleteAdvisorItems'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  ///////////////////////////////////////////////////
  ///////////////// Co_op ////////////////////////////

  // Get All
  GetAllCo_op(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableCo_op + '/GetAllCo_op')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetCo_opByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableCo_op + '/GetCo_opByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateCo_op(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableCo_op + '/AddCo_op' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateCo_op(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableCo_op + '/UpdateCo_op' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteCo_op(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableCo_op + '/DeleteCo_op'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

    ///////////////////////////////////////////////////
  ///////////////// CorrectiveAction /////////////////

  // Get All
  GetAllCorrectiveAction(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableCorrectiveAction + '/GetAllCorrectiveAction')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetCorrectiveActionByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableCorrectiveAction + '/GetCorrectiveActionByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateCorrectiveAction(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableCorrectiveAction + '/AddCorrectiveAction' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateCorrectiveAction(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableCorrectiveAction + '/UpdateCorrectiveAction' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteCorrectiveAction(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableCorrectiveAction + '/DeleteCorrectiveAction'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

    ///////////////////////////////////////////////////
  ///////////////// CoursesCommitment /////////////////

  // Get All
  GetAllCoursesCommitment(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableCoursesCommitment + '/GetAllCoursesCommitment')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetCoursesCommitmentByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableCoursesCommitment + '/GetCoursesCommitmentByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateCoursesCommitment(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableCoursesCommitment + '/AddCoursesCommitment' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateCoursesCommitment(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableCoursesCommitment + '/UpdateCoursesCommitment' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteCoursesCommitment(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableCoursesCommitment + '/DeleteCoursesCommitment'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// ElectronicResources /////////////////

  // Get All
  GetAllElectronicResources(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableElectronicResources + '/GetAllElectronicResources')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetElectronicResourcesByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableElectronicResources + '/GetElectronicResourcesByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateElectronicResources(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableElectronicResources + '/AddElectronicResources' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateElectronicResources(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableElectronicResources + '/UpdateElectronicResources' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteElectronicResources(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableElectronicResources + '/DeleteElectronicResources'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// ElectronicResourcesItem /////////////////

  // Get All
  GetAllElectronicResourcesItem(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableElectronicResourcesItem + '/GetAllElectronicResourcesItem')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetElectronicResourcesItemByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableElectronicResourcesItem + '/GetElectronicResourcesItemByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateElectronicResourcesItem(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableElectronicResourcesItem + '/AddElectronicResourcesItem' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateElectronicResourcesItem(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableElectronicResourcesItem + '/UpdateElectronicResourcesItem' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteElectronicResourcesItem(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableElectronicResourcesItem + '/DeleteElectronicResourcesItem'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// FieldTraining /////////////////

  // Get All
  GetAllFieldTraining(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableFieldTraining + '/GetAllFieldTraining')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetFieldTrainingByID(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableFieldTraining + '/GetFieldTrainingByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateFieldTraining(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableFieldTraining + '/AddFieldTraining' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateFieldTraining(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableFieldTraining + '/UpdateFieldTraining' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteFieldTraining(id: any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableFieldTraining + '/DeleteFieldTraining'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// InternationalAccreditation /////////////////

  // Get All
  GetAllInternationalAccreditation(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableInternationalAccreditation + '/GetAllInternationalAccreditation')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetInternationalAccreditationByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableInternationalAccreditation + '/GetInternationalAccreditationByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateInternationalAccreditation(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableInternationalAccreditation + '/AddInternationalAccreditation' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateInternationalAccreditation(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableInternationalAccreditation + '/UpdateInternationalAccreditation' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteInternationalAccreditation(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableInternationalAccreditation + '/DeleteInternationalAccreditation'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// Moodle /////////////////

  // Get All
  GetAllMoodle(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableMoodle + '/GetAllMoodle')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetMoodleByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableMoodle + '/GetMoodleByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateMoodle(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableMoodle + '/AddMoodle' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateMoodle(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableMoodle + '/UpdateMoodle' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteMoodle(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableMoodle + '/DeleteMoodle'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
    ///////////////////////////////////////////////////
  ///////////////// NumberOfCourses /////////////////

  // Get All
  GetAllNumberOfCoursesDTO(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableNumberOfCourses + '/GetAllNumberOfCoursesDTO')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetNumberOfCoursesDTOByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableNumberOfCourses + '/GetNumberOfCoursesDTOByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateNumberOfCoursesDTO(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableNumberOfCourses + '/AddNumberOfCoursesDTO' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateNumberOfCoursesDTO(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableNumberOfCourses + '/UpdateNumberOfCoursesDTO' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteNumberOfCoursesDTO(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableNumberOfCourses + '/DeleteNumberOfCoursesDTO'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

      ///////////////////////////////////////////////////
  ///////////////// ScientificDegrees /////////////////

  // Get All
  GetAllScientificDegrees(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableScientificDegrees + '/GetAllScientificDegrees')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetScientificDegreesByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableScientificDegrees + '/GetScientificDegreesByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateScientificDegrees(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableScientificDegrees + '/AddScientificDegrees' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateScientificDegrees(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableScientificDegrees + '/UpdateScientificDegrees' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteScientificDegrees(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableScientificDegrees + '/DeleteScientificDegrees'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
      ///////////////////////////////////////////////////
  ///////////////// StudentsNumber /////////////////

  // Get All
  GetAllStudentsNumber(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableStudentsNumber + '/GetAllStudentsNumber')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetStudentsNumberByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudentsNumber + '/GetStudentsNumberByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateStudentsNumber(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableStudentsNumber + '/AddStudentsNumber' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateStudentsNumber(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableStudentsNumber + '/UpdateStudentsNumber' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteStudentsNumber(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableStudentsNumber + '/DeleteStudentsNumber'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  ///////////////////////////////////////////////////
  ///////////////// StudentTransfer /////////////////

  // Get All
  GetAllStudentTransfer(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableStudentTransfer + '/GetAllStudentTransfer')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetStudentTransferByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudentTransfer + '/GetStudentTransferByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateStudentTransfer(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableStudentTransfer + '/AddStudentTransfer' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateStudentTransfer(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableStudentTransfer + '/UpdateStudentTransfer' , id).pipe(
      catchError(this.handleError)
    );
  }

  // Delete
  DeleteStudentTransfer(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableStudentTransfer + '/DeleteStudentTransfer'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

   ///////////////////////////////////////////////////
  ///////////////// StudyPlan /////////////////

  // Get All
  GetAllStudyPlan(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableStudyPlan + '/GetAllStudyPlan')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetStudyPlanByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudyPlan + '/GetStudyPlanByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateStudyPlan(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableStudyPlan + '/AddStudyPlan' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateStudyPlan(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableStudyPlan + '/UpdateStudyPlan' , id).pipe(
      catchError(this.handleError)
    );
  }

    // Delete
    DeleteStudyPlan(id: any): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableStudyPlan + '/DeleteStudyPlan'}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
   ///////////////////////////////////////////////////
  ///////////////// StudyPlanItem /////////////////

  // Get All
  GetAllStudyPlanItem(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableStudyPlanItem + '/GetAllStudyPlanItem')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetStudyPlanItemByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableStudyPlanItem + '/GetStudyPlanItemByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateStudyPlanItem(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableStudyPlanItem + '/AddStudyPlanItem' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateStudyPlanItem(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableStudyPlanItem + '/UpdateStudyPlanItem' , id).pipe(
      catchError(this.handleError)
    );
  }

    // Delete
    DeleteStudyPlanItem(id: any): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableStudyPlanItem + '/DeleteStudyPlanItem'}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
   ///////////////////////////////////////////////////
  ///////////////// TeachingAndLearningMethods /////////////////

  // Get All
  GetAllTeachingAndLearningMethods(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableTeachingAndLearningMethods + '/GetAllTeachingAndLearningMethods')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetTeachingAndLearningMethodsByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableTeachingAndLearningMethods + '/GetTeachingAndLearningMethodsByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateTeachingAndLearningMethods(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableTeachingAndLearningMethods + '/AddTeachingAndLearningMethods' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateTeachingAndLearningMethods(id): Observable<any> {
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableTeachingAndLearningMethods + '/UpdateTeachingAndLearningMethods' , id).pipe(
      catchError(this.handleError)
    );
  }

    // Delete
    DeleteTeachingAndLearningMethods(id: any): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableTeachingAndLearningMethods + '/DeleteTeachingAndLearningMethods'}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
   ///////////////////////////////////////////////////
  ///////////////// TeachingAndLearningMethodsItem /////////////////

  // Get All
  GetAllTeachingAndLearningMethodsItem(): Observable<any> {
    return this.httpClient.get(this.baseUrl + this.apiUrlTableTeachingAndLearningMethodsItem + '/GetAllTeachingAndLearningMethodsItem')
    .pipe(
      catchError(this.handleError)
    );
  }

  // Get by ID
  GetTeachingAndLearningMethodsItemByID(id: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.get(`${this.baseUrl + this.apiUrlTableTeachingAndLearningMethodsItem + '/GetTeachingAndLearningMethodsItemByID'}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create / Add
  CreateTeachingAndLearningMethodsItem(data: any): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.post(this.baseUrl  + this.apiUrlTableTeachingAndLearningMethodsItem + '/AddTeachingAndLearningMethodsItem' , data).pipe(
      catchError(this.handleError)
    );
  }

  // Edit/ Update
  UpdateTeachingAndLearningMethodsItem(id): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.httpClient.put(this.baseUrl  + this.apiUrlTableTeachingAndLearningMethodsItem + '/UpdateTeachingAndLearningMethodsItem' , id).pipe(
      catchError(this.handleError)
    );
  }

    // Delete
    DeleteTeachingAndLearningMethodsItem(id: any): Observable<any> {
      return this.httpClient.delete(`${this.baseUrl + this.apiUrlTableTeachingAndLearningMethodsItem + '/DeleteTeachingAndLearningMethodsItem'}/${id}`).pipe(
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
