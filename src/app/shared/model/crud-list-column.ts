
export class CrudListColumn {

  public field?: string | null;
  public label?: string | null;
  public hint?: string;
  public image64?: boolean = false;
  public islink?: boolean = false;
  public fnFormat?: (value: any) => string;
  public fnShowCondition?: (value: any, defaultValue?: string) => boolean;

  constructor(
    {
      field,
      label,
      hint,
      image64,
      islink,
      fnFormat,
      fnShowCondition
    } : {
      field?: string | null,
      label?: string | null,
      hint?: string,
      image64?: boolean,
      islink?: boolean,
      fnFormat?: (value: any) => string,
      fnShowCondition?: (value: any, defaultValue?: string) => boolean} = {}
  ){
    this.field = field;
    this.label = label;
    this.hint = hint;
    this.image64 = image64;
    this.islink = islink;
    this.fnFormat =fnFormat;
    this.fnShowCondition = fnShowCondition;
  }

  public static builder(): CrudListColumnBuilder {
    return new CrudListColumnBuilder();
  }

  public value(row: any, format: boolean = false): string {
    if (this.field){
      let val = row[this.field];

      let show = true;
      if (this.fnShowCondition) {
        show = this.fnShowCondition(row);
      }

      if (show){

        if (this.fnFormat && format) {
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
  private _label: string | null = null;
  private _field: string | null = null;
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
  public fnShowCondition(val: (value: any, defaultValue?: string) => boolean): CrudListColumnBuilder {
    this._fnShowCondition = val;
    return this;
  }
  public build(): CrudListColumn {
    return new CrudListColumn(
      {
        field: this._field,
        label: this._label,
        hint: this._hint,
        image64: this._image64,
        islink: this._islink,
        fnFormat: this._fnFormat,
        fnShowCondition: this._fnShowCondition}
    );
  }

}
