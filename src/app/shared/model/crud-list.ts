import { TemplateRef } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FilterParam, WfilterPipe } from "wngx-filter";
import { ListAction } from "./crud-list-action";
import { CrudListColumn } from "./crud-list-column";

export class CrudList<T> {

  private _columns: CrudListColumn[] = [];
  private _actions: ListAction[] = [];
  private _actionsLabel: string | null | undefined;
  private _dataSource: T[] = [];
  private _dataSourceFormated: T[] = [];
  private _dataView: BehaviorSubject<T[]> = new BehaviorSubject(this._dataSource);
  private _actionsTemplate!: TemplateRef<any>;

  private _showMore = false;
  private _loadMoreLabel?: string;
  private _fnLoadMore?: () => void;

  constructor(private pipeFilter: WfilterPipe) {
  }

  public get columns(): CrudListColumn[] {
    if(this._actions || this._actionsLabel || this.hasActionsTemplate){
      const actlabel = this._actionsLabel ?? '';
      const actionCol: CrudListColumn = CrudListColumn.builder().label(actlabel).isAction(true).build();
      return [...this._columns, actionCol];
    } else {
      return [...this._columns];
    }
  }
  public set columns(value: CrudListColumn[]) {
    this._columns = value;
  }

  public get dataView(): Observable<T[]> {
    return this._dataView.asObservable();
  }

  public get dataSource(): T[] {
    return this._dataSource;
  }

  public set dataSource(dataSource: T[]){
    this._dataSource = dataSource;
    this.update();
  }

  public set actions(actions: ListAction[]) {
    this._actions = actions;
  }
  public get actions(): ListAction[] {
    return this._actions;
  }
  public set actionsLabel(label: string) {
    this._actionsLabel = label;
  }

  public get hasActionsTemplate(): boolean {
    return this._actionsTemplate != null && this._actionsTemplate != undefined;
  }
  public set actionsTemplate(value: TemplateRef<any>) {
    this._actionsTemplate = value;
  }
  public get actionsTemplate(): TemplateRef<any>{
      return this._actionsTemplate;
  }

  public set showMore(show: boolean) {
    this._showMore = show;
  }
  public get showMore(): boolean {
    return this._showMore;
  }
  public set loadMoreLabel(label: string) {
    this._loadMoreLabel = label;
  }
  public get loadMoreLabel(): string {
    return this._loadMoreLabel ?? 'Mais +';
  }
  public set fnLoadMore(fn: () => void) {
    this._fnLoadMore = fn;
  }

  public filter(filter: FilterParam[] | string | number): void {
    /** use wngx-filter */
    this._dataView.next(this.pipeFilter.transform(this._dataSourceFormated, filter));

  }

  public merge(data:T[]): void {
    if (data) {
      this._dataSource= this._dataSource.concat(data);
      this.update();
    }
  }

  public valueOf(row: T, column: string | null | undefined): any {

    if (row && column) {
      const col: CrudListColumn | undefined = this._columns.find(c => c.field === column);
      if (col) {
        if(col.image64){
          return col.value(row, true, false);
        }else {
          return col.value(row, true);
        }
      } else {
        return '';
      }
    } else {
      return '';
    }

  }

  public addColumn(columnDef: CrudListColumn): void {
    this._columns.push(columnDef);
  }

  public onLoadMore(): void {
    if(this._fnLoadMore) {
      this._fnLoadMore();
    }
  }

  private update(): void {
    if (this._dataSource){
      this.formatDataView();
    } else {
      this._dataView.next([]);
    }
  }

  private formatDataView(): void {
    this._dataSourceFormated = [];
    if(this._columns && this._columns.length > 0){
      this._dataSource.forEach(value => {
        const d: any = {};
        this._columns.forEach(col => {
          if (col?.field){
            const v = this.valueOf(value, col.field);
            d[col.field] = v;
          }
        });
        this._dataSourceFormated.push(d);
      });
    }
    this._dataView.next(this._dataSourceFormated);
  }

}
