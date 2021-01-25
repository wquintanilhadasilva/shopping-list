
export class CrudListColumn {

  constructor(
    public field?: string,
    public label?: string,
    public hint?: string,
    public image64?: boolean,
    public islink?: boolean,
    public fnFormat?: (value: any) => string,
    public fnShowCondition?: (value: any) => boolean
  ){}

  public static builder(): CrudListColumnBuilder {
    return new CrudListColumnBuilder();
  }

  public value(row: any): string {
    if (this.field){
      let val = row[this.field];

      let show = true;
      if (this.fnShowCondition) {
        show = this.fnShowCondition(val);
      }

      if (show){

        if (this.fnFormat) {
          val = this.fnFormat(val);
        }

        return val;

      } else {
        return '';
      }

    } else {
      return '';
    }

  }

}

export class CrudListColumnBuilder {
  private _label?: string;
  private _field?: string;
  private _hint?: string;
  private _image64?: boolean;
  private _islink?: boolean;
  private _fnFormat?: (value: any) => string;
  private _fnShowCondition?: (value: any) => boolean;

  public label(val: string): CrudListColumnBuilder {
    this._label = val;
    return this;
  }
  public field(val: string): CrudListColumnBuilder {
    this._field = val;
    return this;
  }
  public hint(val: string): CrudListColumnBuilder {
    this._hint = val;
    return this;
  }
  public image64(val: boolean): CrudListColumnBuilder {
    this._image64 = val;
    return this;
  }
  public islink(val: boolean): CrudListColumnBuilder {
    this._islink = val;
    return this;
  }
  public fnFormat(val: (value: any) => string): CrudListColumnBuilder {
    this._fnFormat = val;
    return this;
  }
  public fnShowCondition(val: (value: any) => boolean): CrudListColumnBuilder {
    this._fnShowCondition = val;
    return this;
  }
  public build(): CrudListColumn {
    return new CrudListColumn(
      this._field,
      this._label,
      this._hint,
      this._image64,
      this._islink,
      this._fnFormat,
      this._fnShowCondition
    );
  }

}
