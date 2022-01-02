import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { IEnviroDTO } from 'app/Models/RMS-Models/IEnviroDTO';
import { EnviroService } from '../../Services/RMS-Services/enviro.service';
import { CollegeBasicDataService } from '../../Services/RMS-Services/college-basic-data.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-environmental-and-community-service',
  templateUrl: './add-environmental-and-community-service.component.html',
  styleUrls: ['./add-environmental-and-community-service.component.css']
})
export class AddEnvironmentalAndCommunityServiceComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  AddEnviroForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IEnviroStructure: string;
  collegeID: string;
  enviroName: any;
  //
  College: ICollege;
  IEnviroDTO: IEnviroDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private Enviro: EnviroService,
    private dialogRef: MatDialogRef<AddEnvironmentalAndCommunityServiceComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: IEnviroDTO) {
      if (data == null) {
        this.IEnviroDTO = null;
        this.collegeID = '';
        this.enviroName = '';
      } else {
        this.IEnviroDTO = data;
        this.collegeID = data.collegeID;
        this.enviroName = data.enviroName;

      }

      this.AddEnviroForm = fb.group({
        College: [this.collegeID, Validators.required],
        enviroName: [this.enviroName, Validators.required ],
      })
     }
     get f()
{
       return this.AddEnviroForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
     }


       Cancel() {
         this.dialogRef.close();
       }

       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege().subscribe((data: ICollege) => {
          this.College = data;
          console.log(this.College);
       });
      }
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram().subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.IEnviroDTO == null) {
             let NewInter = {
              collegeID : this.AddEnviroForm.get('College').value,
              enviroName : this.AddEnviroForm.get('enviroName').value,
             };
             this.Enviro.CreateEnviro(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            enviroID : this.IEnviroDTO.enviroID,
            collegeID : this.AddEnviroForm.get('College').value,
            enviroName : this.AddEnviroForm.get('enviroName').value,
          };

          console.log(NewInter);

          this.Enviro.UpdateEnviro(NewInter)
             .subscribe(
               response => {
                 this.dialogRef.close();
               },
               error => {
                 console.log(error);
               });
         }
         }

        closeDialog(){
            this.dialogRef.close(false);
          }
}
