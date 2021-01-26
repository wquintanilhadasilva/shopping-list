import { Component, OnInit } from '@angular/core';
import { FilterParam, WfilterPipe } from 'wngx-filter';
import { CrudList } from './shared/model/crud-list';
import { CrudListColumn } from './shared/model/crud-list-column';


export class Veiculo {
  constructor(public ano: number, public placa: string,
    public modelo: string, public marca: string, public data: Date){}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'shopping-list';

  crudList: CrudList<Veiculo> | undefined;

  constructor(private pipe: WfilterPipe) {}

  ngOnInit(): void {
    this.crudList = new CrudList<Veiculo>(this.pipe);
    this.crudList.addColumn(new CrudListColumn({ field: 'ano', label: 'Ano'}));
    this.crudList.addColumn(CrudListColumn.builder().field('ano').label('Ano').build());
    this.crudList.addColumn(CrudListColumn.builder().field('placa').label('Placa').build());
    this.crudList.addColumn(CrudListColumn.builder().field('modelo').label('Modelo').build());
    this.crudList.addColumn(CrudListColumn.builder().field('marca').label('Marca').build());
    this.crudList.addColumn(CrudListColumn.builder().field('data')
        .label('Fabricação')
        .fnFormat((v:Date) => v.toLocaleDateString())
        .fnShowCondition((row:Veiculo)=> row.ano === 2001)
        .build());

    this.buildVeiculo();
  }

  filter(filter: string){
    console.log(filter);
    const f: FilterParam[] = [
      {field: 'ano', value: filter},
      {field: 'placa', value: filter},
      {field: 'data', value: filter},
      {field: 'modelo', value: filter},
      {field: 'marca', value: filter},
    ];
    this.crudList?.filter(f);
  }

  private buildVeiculo(): void {
    const v: Veiculo[] = [];

    for(let i = 0; i <= 50; i++) {
      v.push(new Veiculo(2001, `NGN200${i}`,`Modelo ${i}`, `Marca ${i}`, new Date()));
    }
    if(this.crudList) {
      this.crudList.dataSource = v;
    }

  }

}
