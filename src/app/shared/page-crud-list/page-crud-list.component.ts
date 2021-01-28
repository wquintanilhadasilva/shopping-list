import { Component, Input, OnInit } from '@angular/core';
import { FilterParam, WfilterPipe } from 'wngx-filter';
import { CrudList } from '../model/crud-list';
import { CrudListColumn } from '../model/crud-list-column';

@Component({
  selector: 'app-page-crud-list',
  templateUrl: './page-crud-list.component.html',
  styleUrls: ['./page-crud-list.component.css']
})
export class PageCrudListComponent implements OnInit {

  crudList: CrudList<any> | undefined;

  @Input()
  public set columns(value:CrudListColumn[]){
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.columns = value;
  }

  @Input()
  public set filter(filter: FilterParam[] | string | number){
    this.crudList?.filter(filter);
  }

  @Input()
  public set dataSource(value: any[]){
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.dataSource = value;
  }

  @Input()
  public set actions(value: any[]) {

  }

  constructor(private pipe: WfilterPipe) {
    this.crudList = new CrudList<any>(this.pipe);
  }

  ngOnInit(): void {
  }

}
