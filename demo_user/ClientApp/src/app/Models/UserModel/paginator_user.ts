import { user } from "./user";

export class paginator_user{
  public pageSize:number;
  public pageNumber:number;
  public pageTotal:number;
  public pageUsers:user[];

  constructor(){
    this.pageSize = 0;
    this.pageNumber = 0;
    this.pageTotal = 0;
    this.pageUsers = [];
  }
}
