import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component'
import { RegisterComponent } from './pages/auth/register/register.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { SupportDashboardComponent } from './pages/support/support-dashboard/support-dashboard.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { CreateTicketComponent } from './pages/user/create-ticket/create-ticket.component';
import { TicketDetailComponent } from './shared/tickets/ticket-detail/ticket-detail.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { supportGuard } from './guards/support.guard';
import { userGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { EditTicketComponent } from './pages/support/edit-ticket/edit-ticket.component';
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuard]},
    //{path: 'admin', component: AdminDashboardComponent,canActivate: [authGuard, adminGuard]},
    //{path: 'support', component: SupportDashboardComponent,canActivate: [authGuard, supportGuard]},
    //{path: 'user', component: UserHomeComponent,canActivate: [authGuard, userGuard]},
    {path: 'user/create-ticket', component: CreateTicketComponent, canActivate: [authGuard, userGuard]},
    {path: 'ticket/:id', component: TicketDetailComponent, canActivate: [authGuard]},
    {path: 'ticket/edit/:id', component: EditTicketComponent, canActivate: [authGuard, supportGuard]},
    {path: 'user/edit/:id', component: EditUserComponent, canActivate: [authGuard, adminGuard]},

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: '**', redirectTo: 'login'},

];
