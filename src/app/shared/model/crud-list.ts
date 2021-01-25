import { BehaviorSubject, Observable } from "rxjs";
import { CrudListColumn } from "./crud-list-column";

export class CrudList<T> {

  private _columns: CrudListColumn<T>[] = [];
  private _dataSource: T[] = [];
  private _dataView: BehaviorSubject<T[]> = new BehaviorSubject(this._dataSource);

  public get columns(): CrudListColumn<T>[] {
    return this._columns;
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

  public filter(filter: string): void {
    /** use wngx-filter */
  }

  public merge(data:T[]): void {
    if (data) {
      this._dataSource.concat(data);
      this.update();
    }
  }

  public value(row: T, column: string): string {

    if (row && column) {
      const col: CrudListColumn<T> | undefined = this._columns.find(c => c.field === column);
      if (col) {
        return col.value(row);
      } else {
        return '';
      }
    } else {
      return '';
    }

  }

  private update(): void {
    if (this._dataSource){
      this._dataView.next(this._dataSource);
    } else {
      this._dataView.next([]);
    }
  }

}
