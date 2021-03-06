import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { FilterParam } from 'wngx-filter';
import { ListAction } from '../model/crud-list-action';
import { CrudListColumn } from '../model/crud-list-column';
import { PageCrudListComponent } from '../page-crud-list/page-crud-list.component';

@Component({
  selector: 'app-page-crud',
  templateUrl: './page-crud.component.html',
  styleUrls: ['./page-crud.component.css']
})
export class PageCrudComponent implements OnInit {

  @ViewChild('list')
  private list!: PageCrudListComponent;

  @Input()
  title: string | null = null;

  @Input()
  columns: CrudListColumn[] = [];

  @Input()
  gridActions: ListAction[] = [];

  @Input()
  actionsLabel: string = '';

  @Input()
  showMore = false;

  @Input()
  dataSource: any[] = [];

  @Input()
  loadMoreLabel: string = '';

  @Input()
  actionsTemplate!: TemplateRef<any>;

  @Input()
  filterConfigure?: (filter: string) => FilterParam[];

  @Input()
  loadMoreFn?: () => any[];

  filterParam: FilterParam[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  more(): void {
    if(this.loadMoreFn){
      this.list.merge(this.loadMoreFn());
    }
  }

  filterApply(filter: string): void {
    if(this.filterConfigure) {
      this.filterParam = this.filterConfigure(filter);
    }
  }

}
