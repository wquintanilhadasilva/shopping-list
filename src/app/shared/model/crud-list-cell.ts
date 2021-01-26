export class CrudListCellRow {
  constructor(
    public value: any,
    public field: string | null,
    public label: string | null,
    public hint: string,
    public image64: boolean,
    public islink: boolean) {}
}
