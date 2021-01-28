export class ListAction {

  public icon?: string;
  private _hint?: (value:any) => string;
  private _condition?: (value:any) => boolean;
  public color?: string;

  constructor(
    public label: string,
    public action: (value:any) => void,
    {
      icon,
      hint,
      condition,
      color,
    } : {
      icon?: string;
      hint?: (value:any) => string;
      condition?: (value:any) => boolean;
      color?: string;
    } = {}

  ){
    this.icon = icon;
    this._hint = hint;
    this._condition = condition;
    this.color = color;
  }

  public condition(row: any): boolean {
    return this._condition ? this._condition(row) : true;
  }

  public hint(row: any): string {
    return this._hint ? this._hint(row) : '';
  }

}
