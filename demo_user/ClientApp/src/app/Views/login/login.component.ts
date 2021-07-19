import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/app/Auth/my-auth.service';
import { user } from 'src/app/Models/UserModel/user';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userOnline:string = "";
  error = false;
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')

  });

  constructor(private router: Router, private Auth:MyAuthService,private _userService:UserServiceService) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.error = false;
    this.Auth.removeToken();
    this.Auth.login(this.authForm.controls.username.value,this.authForm.controls.password.value).subscribe(data => {
      this.Auth.setToken(data.token);
      this.userOnline = data.username;
      this._userService.UsersAll().subscribe((_data:user[]) =>{
        for(let item of _data){
          if(item.username === this.userOnline){
            localStorage.setItem("userId",item.id.toString());
          }
        }
    });
      this.router.navigateByUrl('');
    }, err => {
      this.error = true;
    });
  }
}
