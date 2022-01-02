import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
declare var $: any;
  


interface Nationality {
  value: string;
  viewValue: string;
}

interface UserType {
  value: string;
  viewValue: string;
}
interface University {
  value: string;
  viewValue: string;
}
interface Gender {
  value: string;
  viewValue: string;
}



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class TypographyComponent implements OnInit {

  AddForm: FormGroup ;
  Completed = false;
  isLinear = true;
  intFormType : number = 1;
  isdisable : boolean = false;
  loading : boolean = false;
  IsFormValid: boolean = true;
  isSubmitted = false;
  minDate: Date;
  maxDate: Date;
  matcher = new MyErrorStateMatcher();
  selected: Date | null;


constructor(fb : FormBuilder) { 
this.AddForm = fb.group({
  Username: ['', Validators.required],
  Email:['',[Validators.required, Validators.email]],
  FirstName:['', Validators.required],
  LastName:['', Validators.required],
  Address:['', Validators.required],
  IsVip:['', Validators.required ],
  Nationality: ['', Validators.required ],
  University: ['', Validators.required ],
  UserType: ['', Validators.required ],
  StartDate: ['', Validators.required ],
  EndDate: ['', Validators.required ],
  Organizer: ['', Validators.required ],
  Gender: ['', Validators.required ],
  Title: ['', Validators.required ],

})

  }
  
  nations: Nationality[] = [
    {value: 'eg', viewValue: 'Egypt'},
    {value: 'USA', viewValue: 'USA'},
    {value: 'KSA', viewValue: 'Saudi Arabia'}
  ];
  Users: UserType[] = [
    {value: 'specker', viewValue: 'Speaker'},
    {value: 'Event-Planner', viewValue: 'Event Planner'},
    {value: 'Founder', viewValue: 'Founder'}
  ];
  University: University[] = [
    {value: 'MUST', viewValue: 'MUST'},
    {value: 'MIU', viewValue: 'MIU'},
    {value: 'AUC', viewValue: 'AUC'}
  ];
  Gender: Gender[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  
  ];

  showNotification(from, align){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    },{
        type: type[color],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

  ngOnInit() {
  }
CheckData(){
  
}
}
