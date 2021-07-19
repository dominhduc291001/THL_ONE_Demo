import { Component, OnInit } from '@angular/core';
import { MyAuthService } from 'src/app/Auth/my-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth:MyAuthService) { }

  ngOnInit(): void {
  }

  checkLogin(){
    return this._auth.isAuth();;
  }
  logout(){
    this._auth.logout();
  }
}
