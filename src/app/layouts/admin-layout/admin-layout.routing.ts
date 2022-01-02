import { UserImagesComponent } from './../../Admin-Components/user-images/user-images.component';
import { AddUserAdminComponent } from 'app/Admin-Components/add-user-admin/add-user-admin.component';
import { AddJobComponent } from 'app/Admin-Components/add-job/add-job.component';
import { JobComponent } from './../../Admin-Components/job/job.component';
import { AddGenderComponent } from './../../Admin-Components/add-gender/add-gender.component';
import { AddEventStatusComponent } from './../../Admin-Components/add-event-status/add-event-status.component';
import { EventVenueComponent } from 'app/Admin-Components/event-venue/event-venue.component';
import { AddEventAttendanceComponent } from './../../Admin-Components/add-event-attendance/add-event-attendance.component';
import { EventStatusComponent } from './../../Admin-Components/event-status/event-status.component';
import { EventDetailsComponent } from './../../Admin-Components/event-details/event-details.component';
import { EventCategoryComponent } from './../../Admin-Components/event-category/event-category.component';
import { EventAttendanceComponent } from './../../Admin-Components/event-attendance/event-attendance.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import { AuthguardGuard } from 'app/Services/Guards/authguard.guard';
import { AddEventCategoryComponent } from 'app/Admin-Components/add-event-category/add-event-category.component';
import { AddEventDetailsComponent } from 'app/Admin-Components/add-event-details/add-event-details.component';
import { AddEventVenueComponent } from 'app/Admin-Components/add-event-venue/add-event-venue.component';
import { GenderComponent } from 'app/Admin-Components/gender/gender.component';
import { NationalityComponent } from 'app/Admin-Components/nationality/nationality.component';
import { AddNationalityComponent } from 'app/Admin-Components/add-nationality/add-nationality.component';
import { OrganizerComponent } from 'app/Admin-Components/organizer/organizer.component';
import { AddOrganizerComponent } from 'app/Admin-Components/add-organizer/add-organizer.component';
import { UniversityComponent } from 'app/Admin-Components/university/university.component';
import { AddUniversityComponent } from 'app/Admin-Components/add-university/add-university.component';
import { UserAdminComponent } from 'app/Admin-Components/user-admin/user-admin.component';
import { AddUserAttendComponent } from 'app/Admin-Components/add-user-attend/add-user-attend.component';
import { UserAttendComponent } from 'app/Admin-Components/user-attend/user-attend.component';
import { AddUserImagesComponent } from 'app/Admin-Components/add-user-images/add-user-images.component';
import { AddUserTypeComponent } from 'app/Admin-Components/add-user-type/add-user-type.component';
import { UserTypeComponent } from 'app/Admin-Components/user-type/user-type.component';
import { CollegeDataComponent } from 'app/Reports/college-data/college-data.component';
import { MajorsOfCollegeComponent } from 'app/Reports/majors-of-college/majors-of-college.component';
import { AcademicProgramComponent } from 'app/Reports/academic-program/academic-program.component';
import { HumanResourcesComponent } from 'app/Reports/human-resources/human-resources.component';
import { StudentsActivitiesComponent } from 'app/Reports/students-activities/students-activities.component';
import { PostgraduateComponent } from 'app/Reports/postgraduate/postgraduate.component';
import { EnvironmentalandCommunityServiceComponent } from 'app/Reports/environmentaland-community-service/environmentaland-community-service.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',           component: DashboardComponent ,canActivate:[AuthguardGuard] },
    { path: 'user-profile',        component: UserProfileComponent ,canActivate:[AuthguardGuard]},
    { path: 'table-list',          component: TableListComponent ,canActivate:[AuthguardGuard]},
    { path: 'add-new-user',        component: TypographyComponent,canActivate:[AuthguardGuard] },

    { path: 'Event-attendance',    component: EventAttendanceComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Event-attendance',component: AddEventAttendanceComponent ,canActivate:[AuthguardGuard]},

    { path: 'Event-category',    component: EventCategoryComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Event-category',component: AddEventCategoryComponent ,canActivate:[AuthguardGuard]},

    { path: 'Event-details',    component: EventDetailsComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Event-details',component: AddEventDetailsComponent ,canActivate:[AuthguardGuard]},

    { path: 'Event-status',    component: EventStatusComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Event-status',component: AddEventStatusComponent ,canActivate:[AuthguardGuard]},

    { path: 'Event-venue',         component: EventVenueComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Event-attendance',component: AddEventVenueComponent ,canActivate:[AuthguardGuard]},

    { path: 'Gender',    component: GenderComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Gender',component: AddGenderComponent ,canActivate:[AuthguardGuard]},

    { path: 'Job',    component: JobComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Job',component: AddJobComponent ,canActivate:[AuthguardGuard]},

    { path: 'Nationality',    component: NationalityComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Nationality',component: AddNationalityComponent ,canActivate:[AuthguardGuard]},

    { path: 'Organizer',    component: OrganizerComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-Organizer',component: AddOrganizerComponent ,canActivate:[AuthguardGuard]},

    { path: 'University',    component: UniversityComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-University',component: AddUniversityComponent ,canActivate:[AuthguardGuard]},

    { path: 'User-Admin',    component: UserAdminComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-User-Admin',component: AddUserAdminComponent ,canActivate:[AuthguardGuard]},

    { path: 'User-Attend',    component: UserAttendComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-User-Attend',component: AddUserAttendComponent ,canActivate:[AuthguardGuard]},

    { path: 'User-Images',    component: UserImagesComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-User-Images',component: AddUserImagesComponent ,canActivate:[AuthguardGuard]},

    { path: 'User-Type',    component: UserTypeComponent ,canActivate:[AuthguardGuard]},
    { path: 'Add-User-Type',component: AddUserTypeComponent ,canActivate:[AuthguardGuard]},



    //Reports
    { path: 'CollegeData',    component: CollegeDataComponent ,canActivate:[AuthguardGuard]},
    { path: 'Majors',component: MajorsOfCollegeComponent ,canActivate:[AuthguardGuard]},
    { path: 'AcademicProgram',    component: AcademicProgramComponent ,canActivate:[AuthguardGuard]},
    { path: 'HumanResources',component: HumanResourcesComponent ,canActivate:[AuthguardGuard]},
    { path: 'StudentsActivities',    component: StudentsActivitiesComponent ,canActivate:[AuthguardGuard]},
    { path: 'Postgraduate',component: PostgraduateComponent ,canActivate:[AuthguardGuard]},
    { path: 'EnvironmentalandCommunityService',component: EnvironmentalandCommunityServiceComponent ,canActivate:[AuthguardGuard]},

];
