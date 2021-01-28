
export class CrudListColumn {

  public field?: string | null;
  public label?: string | null;
  public hint?: string;
  public image64?: boolean = false;
  public islink?: boolean = false;
  public defaultValue?: string = '';
  public fnFormat?: (value: any) => any;
  public fnShowCondition?: (value: any) => boolean;
  public fnCellValue?: (value: any) => any;
  public link?: (value: any) => string;
  public isAction?: boolean = false;

  constructor(
    {
      field,
      label,
      hint,
      image64,
      islink,
      defaultValue,
      fnFormat,
      fnShowCondition,
      fnCellValue,
      link,
      isAction,
    } : {
      field?: string | null,
      label?: string | null,
      hint?: string,
      image64?: boolean,
      islink?: boolean,
      defaultValue?: string,
      fnFormat?: (value: any) => any,
      fnShowCondition?: (value: any) => boolean,
      fnCellValue?: (value: any) => any,
      link?: (value: any) => string,
      isAction?: boolean,
    } = {}
  ){
    this.field = field;
    this.label = label;
    this.hint = hint;
    this.image64 = image64;
    this.islink = islink;
    this.defaultValue = defaultValue ?? '';
    this.fnFormat = fnFormat;
    this.fnShowCondition = fnShowCondition;
    this.fnCellValue = fnCellValue;
    this.link = link;
    this.isAction = isAction;
  }

  public static builder(): CrudListColumnBuilder {
    return new CrudListColumnBuilder();
  }

  public value(row: any, format: boolean = false, useFnCellValue: boolean = true): any {

    let show = true;

    if (this.fnShowCondition) {
      show = this.fnShowCondition(row);
    }

    if (show){

      /** Se tiver uma função para gerar o valor da célula, retorna o valor gerado pela função */
      if(this.fnCellValue && useFnCellValue) {

        return this.fnCellValue(row);

      }else {

        if(!this.field){
          return this.defaultValue ?? '';
        }

        let val = row[this.field];

        if (this.fnFormat && format) {
          val = this.fnFormat(val);
        }

        return val;
      }

    } else {
      return this.defaultValue ?? '';
    }

  }

  getLink(val: any): string {
    if(this.link){
      return this.link(val);
    } else {
      return '#';
    }
  }

  getHint(): string {
    return this.hint ?? '';
  }

}

export class CrudListColumnBuilder {
  private _label: string | null = null;
  private _field: string | null = null;
  private _hint?: string;
  private _image64?: boolean;
  private _islink?: boolean;
  private _defaultValue?: string;
  private _fnFormat?: (value: any) => string;
  private _fnShowCondition?: (value: any) => boolean;
  private _fnCellValue?: (value: any) => string;
  private _link?: (value: any) => string;
  private _isAction?: boolean = false

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
  public defaultValue(val: string): CrudListColumnBuilder {
    this._defaultValue = val;
    return this;
  }
  public fnFormat(val: (value: any) => any): CrudListColumnBuilder {
    this._fnFormat = val;
    return this;
  }
  public fnShowCondition(val: (value: any) => boolean): CrudListColumnBuilder {
    this._fnShowCondition = val;
    return this;
  }
  public fnCellValue(val: (value: any) => any): CrudListColumnBuilder {
    this._fnCellValue = val;
    return this;
  }
  public link(val: (value: any) => string): CrudListColumnBuilder {
    this._link = val;
    return this;
  }
  public isAction(val: boolean): CrudListColumnBuilder {
    this._isAction = val;
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
        defaultValue: this._defaultValue,
        fnFormat: this._fnFormat,
        fnShowCondition: this._fnShowCondition,
        fnCellValue: this._fnCellValue,
        link: this._link,
        isAction: this._isAction,
      }
    );
  }

}
