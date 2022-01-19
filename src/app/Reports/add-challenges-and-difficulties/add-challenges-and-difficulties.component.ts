import { CollegeBasicDataService } from './../../Services/RMS-Services/college-basic-data.service';
import { ChallengesAndDifficultiesService } from './../../Services/RMS-Services/challenges-and-difficulties.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Challenges_and_DifficultiesDTO } from 'app/Models/RMS-Models/Challenges_and_DifficultiesDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICollege } from 'app/Models/RMS-Models/ICollege';
import { MyErrorStateMatcher } from '../add-college-programs/add-college-programs.component';

@Component({
  selector: 'app-add-challenges-and-difficulties',
  templateUrl: './add-challenges-and-difficulties.component.html',
  styleUrls: ['./add-challenges-and-difficulties.component.css']
})
export class AddChallengesAndDifficultiesComponent implements OnInit {

  
  matcher = new MyErrorStateMatcher();
  AddChallengesAndDifficultiesForm: FormGroup;
  IsFormValid = true;
  isSubmitted = false;

  // _IEnviroStructure: string;
  collegeID: string;
  challenges: any;
  difficulties: any;
  solutions: string;
  apply: string;
  //
  College: ICollege;
  Challenges_and_DifficultiesDTO: Challenges_and_DifficultiesDTO;
  //

  constructor(private CollegeBasicDataService: CollegeBasicDataService, private ChallengesAndDifficultiesService: ChallengesAndDifficultiesService,
    private dialogRef: MatDialogRef<AddChallengesAndDifficultiesComponent>, fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Challenges_and_DifficultiesDTO) {
      if (data == null) {
        this.Challenges_and_DifficultiesDTO = null;
        this.collegeID = '';
        this.challenges = '';
        this.difficulties = '';
        this.solutions = '';
        this.apply = '';
      } else {
        this.Challenges_and_DifficultiesDTO = data;
        this.collegeID = data.collegeID;
        this.challenges = data.challenges;
        this.difficulties = data.difficulties;
        this.solutions = data.solutions;
        this.apply = data.apply;
      }

      this.AddChallengesAndDifficultiesForm = fb.group({
        College: [this.collegeID, Validators.required],
        challenges: [this.challenges, Validators.required ],
        difficulties: [this.difficulties, Validators.required],
        solutions: [this.solutions, Validators.required],
        apply: [this.apply, Validators.required],
      })
     }
     get f()
{
       return this.AddChallengesAndDifficultiesForm.controls;
     }

       ngOnInit() {
        this.LoadCollegeData();
        // this.LoadProgramData();
     }


       Cancel() {
         this.dialogRef.close();
       }

       LoadCollegeData() {
        this.CollegeBasicDataService.GetAllCollege(sessionStorage.getItem('CollegeID')).subscribe((data: ICollege) => {
          this.College = data;
          //console.log(this.College);
       });
      }
      //  LoadProgramData() {
      //   this.CollegeBasicDataService.GetAllProgram(sessionStorage.getItem('CollegeID')).subscribe((data: ICPrograms) => {
      //     this.Program = data;
      //     console.log(this.Program);
      //  });
      // }
       saveData(): void {
         if (this.Challenges_and_DifficultiesDTO == null) {
             let NewInter = {
              collegeID : this.AddChallengesAndDifficultiesForm.get('College').value,
              challenges : this.AddChallengesAndDifficultiesForm.get('challenges').value,
              difficulties : this.AddChallengesAndDifficultiesForm.get('difficulties').value,
              solutions : this.AddChallengesAndDifficultiesForm.get('solutions').value,
              apply : this.AddChallengesAndDifficultiesForm.get('apply').value,
             };
             this.ChallengesAndDifficultiesService.CreateChallenges_and_Difficulties(NewInter)
                 .subscribe(
                   response => {
                     this.dialogRef.close();
                   },
                   error => {
                     console.log(error);
                   });
         } else{
          let NewInter = {
            challenges_and_DifficultiesID : this.Challenges_and_DifficultiesDTO.challenges_and_DifficultiesID,
            collegeID : this.AddChallengesAndDifficultiesForm.get('College').value,
            challenges : this.AddChallengesAndDifficultiesForm.get('challenges').value,
            difficulties : this.AddChallengesAndDifficultiesForm.get('difficulties').value,
            solutions : this.AddChallengesAndDifficultiesForm.get('solutions').value,
            apply : this.AddChallengesAndDifficultiesForm.get('apply').value,
          };

          console.log(NewInter);

          this.ChallengesAndDifficultiesService.UpdateChallenges_and_Difficulties(NewInter)
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
