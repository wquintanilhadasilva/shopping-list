import { Component, OnInit } from '@angular/core';
import { WfilterPipe } from 'wngx-filter';
import { CrudList } from './shared/model/crud-list';
import { CrudListColumn } from './shared/model/crud-list-column';


export class Veiculo {
  constructor(public ano: number, public placa: string, public modelo: string, public marca: string){}
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
    this.crudList.addColumn(CrudListColumn.builder().field('ano').build());
    this.crudList.addColumn(CrudListColumn.builder().field('placa').build());
    this.crudList.addColumn(CrudListColumn.builder().field('modelo').build());
    this.crudList.addColumn(CrudListColumn.builder().field('marca').build());

    this.buildVeiculo();
  }

  private buildVeiculo(): void {
    const v: Veiculo[] = [];

    for(let i = 0; i <= 50; i++) {
      v.push(new Veiculo(2001, `NGN200${i}`,`Modelo ${i}`, `Marca ${i}`));
    }
    if(this.crudList) {
      this.crudList.dataSource = v;
    }

  }

}
