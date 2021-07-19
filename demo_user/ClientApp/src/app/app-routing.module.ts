import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { LoginComponent } from './Views/login/login.component';
import { ManagerFileComponent } from './Views/manager-file/manager-file.component';
import { ManagerUserComponent } from './Views/manager-user/manager-user.component';

const routes: Routes = [
  {path:'',component:ManagerUserComponent, canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'ManagerUser',component:ManagerUserComponent, canActivate:[AuthGuard] },
  {path:'ManagerFile',component:ManagerFileComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
