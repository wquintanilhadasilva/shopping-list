import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FilterParam, WfilterPipe } from 'wngx-filter';
import { CrudList } from '../model/crud-list';
import { ListAction } from '../model/crud-list-action';
import { CrudListColumn } from '../model/crud-list-column';

@Component({
  selector: 'app-page-crud-list',
  templateUrl: './page-crud-list.component.html',
  styleUrls: ['./page-crud-list.component.css']
})
export class PageCrudListComponent implements OnInit {

  crudList: CrudList<any> | undefined;

  @Output()
  loadMore: EventEmitter<void> = new EventEmitter<void>();

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
  public set actions(value: ListAction[]) {
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.actions = value;
  }
  @Input()
  public set actionsLabel(value: string) {
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.actionsLabel = value;
  }
  @Input()
  public set actionsTemplate(value: TemplateRef<any>) {
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.actionsTemplate = value;
  }
  @Input()
  public set showMore(show: boolean) {
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.showMore = show;
  }
  @Input()
  public set loadMoreLabel(label: string) {
    if(!this.crudList){
      this.crudList = new CrudList<any>(this.pipe);
    }
    this.crudList.loadMoreLabel = label;
  }
  constructor(private pipe: WfilterPipe) {
    this.crudList = new CrudList<any>(this.pipe);
  }

  ngOnInit(): void {
    this.crudList!.fnLoadMore = () => this.loadMore.emit();
  }

}
