import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { ManagerFileComponent } from './Views/manager-file/manager-file.component';
import { ManagerUserComponent } from './Views/manager-user/manager-user.component';

const routes: Routes = [
  {path:'',component:ManagerUserComponent},
  {path:'login',component:LoginComponent},
  {path:'ManagerUser',component:ManagerUserComponent},
  {path:'ManagerFile',component:ManagerFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
