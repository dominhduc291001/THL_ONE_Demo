import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { user } from 'src/app/Models/UserModel/user';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'dialog-user',
  templateUrl: './dialog-user.html',
  styleUrls: ['./dialog-user-style.css'],
})

export class DialogUser implements OnInit{

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    last_name: new FormControl(''),
    firt_name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: {_user:user, _edit:boolean, _create:boolean},private _userService:UserServiceService){}
  ngOnInit(
  ){
    if(this.data._create === false){
      this.userForm.controls.username.setValue(this.data._user.username);
      this.userForm.controls.password.setValue(this.data._user.password);
      this.userForm.controls.firt_name.setValue(this.data._user.firt_name);
      this.userForm.controls.last_name.setValue(this.data._user.last_name);
      this.userForm.controls.email.setValue(this.data._user.email);
      this.userForm.controls.phone.setValue(this.data._user.phone);
      this.userForm.controls.username.disable();
    }
    if(this.data._edit === false){
      this.userForm.controls.password.disable();
      this.userForm.controls.firt_name.disable();
      this.userForm.controls.last_name.disable();
      this.userForm.controls.email.disable();
      this.userForm.controls.phone.disable();
    }
  }

  updateUser(){
    let res = this.userForm.value;
    let userUpdate:user = this.data._user;
    userUpdate.password = res.password;
    userUpdate.firt_name = res.firt_name;
    userUpdate.last_name = res.last_name;
    userUpdate.email = res.email;
    userUpdate.phone = res.phone;
    this._userService.UpdateUser(userUpdate).subscribe(() =>{
    });
  }

  createUser(){
    let res = this.userForm.value;
    let userNew:user = new user();
    userNew.username = res.username;
    userNew.password = res.password;
    userNew.firt_name = res.firt_name;
    userNew.last_name = res.last_name;
    userNew.email = res.email;
    userNew.phone = res.phone;
    this._userService.AddUser(userNew).subscribe(() =>{
      alert("Thêm thành công !!!");
    });
  }

}
