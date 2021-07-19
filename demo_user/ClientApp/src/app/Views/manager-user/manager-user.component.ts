import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyAuthService } from 'src/app/Auth/my-auth.service';
import { paginator_request } from 'src/app/Models/UserModel/paginator_request';
import { paginator_user } from 'src/app/Models/UserModel/paginator_user';
import { user } from 'src/app/Models/UserModel/user';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { DialogUser } from '../dialog/dialogUser/dialog-user';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.css']
})
export class ManagerUserComponent implements OnInit {

  constructor(private _userService:UserServiceService, private _Auth:MyAuthService,public dialog:MatDialog) { }
  _pageUser:paginator_user = new paginator_user();

  ngOnInit(): void {
    let defaultPage:paginator_request = new paginator_request();
    this._userService.PaginatorUser(defaultPage).subscribe(data => {
      this._pageUser = data;
    })
  }

  openViewUser(item: user){
    this.dialog.open(DialogUser,{
      height: '500px',
      width: '450px',
      data : {
        _user:item,
        _edit: false,
        _create:false
      }
    });
  }
  openUpdateUser(item:user){
    this.dialog.open(DialogUser,{
      height: '500px',
      width: '450px',
      data : {
        _user:item,
        _edit: true,
        _create:false
      }
    }).afterClosed().subscribe(() =>{
      alert("Cập nhập thành công !!!");
    });
  }

  openCreateUser(){
    this.dialog.open(DialogUser,{
      height: '500px',
      width: '450px',
      data : {
        _edit: true,
        _create:true
      }
    }).afterClosed().subscribe(() =>{
      let resPage:paginator_request = new paginator_request();
      resPage.pageNumber = this._pageUser.pageTotal;
      resPage.pageSize = this._pageUser.pageSize;
      if(this._pageUser.pageUsers.length === this._pageUser.pageSize){
        resPage.pageNumber += 1;
      }
      this._userService.PaginatorUser(resPage).subscribe(data => {
        this._pageUser = data;
      });
    });
  }

  changeSize(event:any){
    let resPage:paginator_request = new paginator_request();
    resPage.pageSize = parseInt(event.target.value);
    resPage.pageNumber = 1;
    this._userService.PaginatorUser(resPage).subscribe(data => {
      this._pageUser = data;
    });
  }
  checkLeft(){
    if(this._pageUser.pageNumber<=1){
      return false;
    }
    return true;
  }
  checkRight(){
    if(this._pageUser.pageNumber >= this._pageUser.pageTotal){
      return false;
    }
    return true;
  }
  rightPage(){
    let resPage:paginator_request = new paginator_request();
    resPage.pageNumber = this._pageUser.pageNumber += 1;
    resPage.pageSize = this._pageUser.pageSize;
    this._userService.PaginatorUser(resPage).subscribe(data => {
      this._pageUser = data;
    });
  }
  leftPage(){
    let resPage:paginator_request = new paginator_request();
    resPage.pageNumber = this._pageUser.pageNumber -= 1;
    resPage.pageSize = this._pageUser.pageSize;
    this._userService.PaginatorUser(resPage).subscribe(data => {
      this._pageUser = data;
    });
  }

  deleteUser(item:user){
    this._userService.DeleteUser(item).subscribe(() => {
      let resPage:paginator_request = new paginator_request();
      resPage.pageNumber = this._pageUser.pageNumber;
      if(this._pageUser.pageUsers.length === 1 && this._pageUser.pageNumber != 1){
        resPage.pageNumber -= 1;
      }
      resPage.pageSize = this._pageUser.pageSize;
      this._userService.PaginatorUser(resPage).subscribe(data => {
        this._pageUser = data;
      });
      alert("Xoá thành công !!!");
    })
  }
}
