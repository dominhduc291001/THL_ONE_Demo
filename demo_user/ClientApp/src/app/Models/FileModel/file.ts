export class file{
  public id:number;
  public userId:number;
  public fileName:string;
  public fileType:string;
  public data:string;
  public isUsed:boolean;

  constructor(){
    this.id = 0;
    this.userId = 1;
    this.fileName = "";
    this.fileType = "";
    this.data = "";
    this.isUsed = true;
  }
}
