import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'googleapis';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'الرئيسية',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/add-new-user', title: 'Add New User',  icon:'library_books', class: '' },
    // { path: '/table-list', title: 'Show All Data',  icon:'content_paste', class: '' },
    // { path: '/University'   ,    title: 'الكلية',  icon:'school', class: '' },
    // { path: '/Event-attendance', title: 'Event Attendance',  icon:'event', class: '' },
    // { path: '/Event-category',   title: 'Event-category',  icon:'event_available', class: '' },
    // { path: '/Event-details',    title: 'Event-details',  icon:'calendar_view_day', class: '' },
    // { path: '/Event-status' ,    title: 'Event-status',  icon:'date_range', class: '' },
    // { path: '/Event-venue'  ,    title: 'Event-venue',  icon:'apartment', class: '' },
    // { path: '/Gender'       ,    title: 'Gender',  icon:'male', class: '' },
    // { path: '/Nationality'       ,    title: 'Nationality',  icon:'flag', class: '' },
    // { path: '/Job'          ,    title: 'Jobs',  icon:'work', class: '' },
    // { path: '/Organizer'    ,    title: 'Organizers',  icon:'manage_accounts', class: '' },
    // { path: '/User-Admin'   ,    title: 'User Admins',  icon:'admin_panel_settings', class: '' },
    // { path: '/User-Attend'  ,    title: 'User Attendance',  icon:'warning', class: '' },
    // { path: '/User-Images'  ,    title: 'User Images',  icon:'image', class: '' },
    // { path: '/User-Type'    ,    title: 'User Types',  icon:'group_add', class: '' },
  
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    
    { path: '/CollegeData'   ,    title: ' البيانات الأساسية للكلية',  icon:'school', class: '' },
    { path: '/AcademicProgram'   ,    title: 'البرامج الأكاديمية',  icon:'library_books', class: '' },
    { path: '/HumanResources'   ,    title: 'الموارد البشرية',  icon:'bubble_chart', class: '' },
    { path: '/StudentsActivities'   ,    title: 'الأنشطة الطلابية',  icon:'person', class: '' },
    { path: '/Postgraduate'   ,    title: 'الدراسات العليا',  icon:'manage_accounts', class: '' },
    { path: '/EnvironmentalandCommunityService'   ,    title: 'خدمة المجتمع وتنمية البيئة',  icon:'warning', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  
  constructor(private AuthService: AuthService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    this.AuthService.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/auth']);
}
}
