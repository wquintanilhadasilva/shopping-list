import { BehaviorSubject, Observable } from "rxjs";
import { FilterParam, WfilterPipe } from "wngx-filter";
import { CrudListColumn } from "./crud-list-column";

export class CrudList<T> {

  private _columns: CrudListColumn[] = [];
  private _dataSource: T[] = [];
  private _dataSourceFormated: T[] = [];
  private _dataView: BehaviorSubject<T[]> = new BehaviorSubject(this._dataSource);

  constructor(private pipeFilter: WfilterPipe) {
  }

  public get columns(): CrudListColumn[] {
    return [...this._columns];
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

  public filter(filter: FilterParam[] | string | number): void {
    /** use wngx-filter */
    this._dataView.next(this.pipeFilter.transform(this._dataSourceFormated, filter));

  }

  public merge(data:T[]): void {
    if (data) {
      this._dataSource.concat(data);
      this.update();
    }
  }

  public valueOf(row: T, column: string | null | undefined): string {

    if (row && column) {
      const col: CrudListColumn | undefined = this._columns.find(c => c.field === column);
      if (col) {
        return col.value(row, true);
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

  private update(): void {
    if (this._dataSource){
      // this._dataView.next(this._dataSource);
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
