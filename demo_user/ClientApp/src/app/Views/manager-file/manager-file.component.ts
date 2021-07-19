import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { file } from 'src/app/Models/FileModel/file';
import { FileServiceService } from 'src/app/Services/file-service.service';
import { DialogFile } from '../dialog/dialogFile/dialog-file';

@Component({
  selector: 'app-manager-file',
  templateUrl: './manager-file.component.html',
  styleUrls: ['./manager-file.component.css']
})
export class ManagerFileComponent implements OnInit {
  listFile:file[] = [];
  displayedColumns: string[] = ['Tên file', 'Kiểu file'];
  constructor(private _fileService:FileServiceService,private sanitizer: DomSanitizer,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.update();
  }
  openCreateFile(){
    this.dialog.open(DialogFile,{
      height: '230px',
      width: '450px'
    }).afterClosed().subscribe(() =>{
      this.update();
    });
  }
  update(){
    let idUser = parseInt(localStorage.getItem("userId")!);
    this._fileService.GetFilesByUserId(idUser).subscribe(data =>{
      this.listFile = data;
    })
  }
  linkDown(item:file){
    let _result =   `data:${item.fileType};base64,${item.data}`;
    let result  = this.sanitizer.bypassSecurityTrustResourceUrl(_result);
    return result;
  }

}
