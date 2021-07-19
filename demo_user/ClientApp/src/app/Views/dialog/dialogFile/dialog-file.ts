import { Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import { file } from 'src/app/Models/FileModel/file';
import { FileServiceService } from 'src/app/Services/file-service.service';

@Component({
  selector: 'dialog-file',
  templateUrl: './dialog-file.html',
  styleUrls: ['./dialog-file-style.css'],
})

export class DialogFile implements OnInit{
  fileForm = new FormGroup({
    uploadFile : new FormControl('')
  });

  type:string = "";
  name:string = "";
  dataFile:string = "";

  constructor(private _fileService:FileServiceService, ){}
  ngOnInit(){
  }

  public fileChange(inputValue:any):void {
    var file: File = inputValue.target.files[0];
    var myReader: FileReader = new FileReader();
    this.name = file.name;
    this.type = file.type;
    myReader.onloadend = function (e) {
    }
    let res = myReader.readAsBinaryString(file as Blob);

    let reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onloadend = () => {
        this.dataFile = reader.result as string;
      };
  }

  createFile(){
    let newFile:file = new file();
    newFile.fileName = this.name;
    newFile.fileType = this.type;
    newFile.userId = parseInt(localStorage.getItem("userId")!);
    let arr_data = this.dataFile.split(',')
    newFile.data = arr_data[arr_data.length - 1];
    this._fileService.AddFile(newFile).subscribe(data=>{
    })
  }

}
