import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { ManagerFileComponent } from './Views/manager-file/manager-file.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './Views/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { headerInterceptor } from './Auth/headerInterceptor';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDialogModule} from '@angular/material/dialog';
import { ManagerUserComponent } from './Views/manager-user/manager-user.component';
import { DialogUser } from './Views/dialog/dialogUser/dialog-user';
import {MatTableModule} from '@angular/material/table';
import { DialogFile } from './Views/dialog/dialogFile/dialog-file';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ManagerFileComponent,
    LoginComponent,
    DialogUser,
    ManagerUserComponent,
    DialogFile
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatCardModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatGridListModule,
    MatToolbarModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: headerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
