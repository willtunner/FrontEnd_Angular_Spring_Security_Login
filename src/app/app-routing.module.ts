import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';
import { ListUsersComponent } from './tasks/list-users/list-users.component';

const routes: Routes = [
 {
   path: '',
   component: HomeComponent,
   children: [
     { path: '', component: TaskListComponent },
     { path: '', component: TaskFormComponent },
     { path: 'task/list-user', component: ListUsersComponent },
     { path: 'edit/:id', component: TaskFormComponent }
   ],
   canActivate: [AuthGuard] // retorna true ou false, se for false vai para rota de baixo .
 },
 {
   path: '',
   component: AuthenticationComponent,
   children: [
     { path: '', redirectTo: 'login', pathMatch: 'full'},
     { path: 'login', component: LoginComponent},
     { path: 'create-account', component: CreateAccountComponent }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
