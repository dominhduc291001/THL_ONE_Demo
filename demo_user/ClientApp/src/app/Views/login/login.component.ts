import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/app/Auth/my-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')

  });

  constructor(private router: Router, private Auth:MyAuthService) { }

  ngOnInit(): void {
  }
  loginUser(){
    this.error = false;
    this.Auth.removeToken();
    this.Auth.login(this.authForm.controls.username.value,this.authForm.controls.password.value).subscribe(data => {
      this.Auth.setToken(data.token);
      this.router.navigateByUrl('');
    }, err => {
      this.error = true;
    });
  }
}
