import { Component, OnInit } from '@angular/core';
import { ListAction } from 'src/app/shared/model/crud-list-action';
import { CrudListColumn } from 'src/app/shared/model/crud-list-column';
import { ImageService } from 'src/app/shared/services/image.service';
import { FilterParam } from 'wngx-filter';

export class Veiculo {
  constructor(public ano: number, public placa: string,
    public modelo: string, public marca: string, public data: Date, public foto: any){}
}
@Component({
  selector: 'app-leitura',
  templateUrl: './leitura.component.html',
  styleUrls: ['./leitura.component.css']
})
export class LeituraComponent implements OnInit {

  v: Veiculo[] = [];

  columns: CrudListColumn[] = [];

  showMore = true;

  actions: ListAction[] = [
    // {label: 'Habilitar', icon: 'fa fa', color: 'warn', condition: (row:Veiculo) => row.ano === 2002 },
    new ListAction('Habilitar', (row: Veiculo) => console.log(row), {hint: (row:Veiculo) => `executar ${row.marca}`,}),
    new ListAction('COndicional', this.x, {condition: (v:Veiculo) => v.placa.indexOf('NGN2000') > -1 }),
    new ListAction('Editar', this.x),
    new ListAction('XPTO', this.y),
    new ListAction('AAA', (row:Veiculo) => this.a(row)),
  ];

  constructor(imageService: ImageService) {
    this.columns = [
      new CrudListColumn({ field: 'ano', label: 'Ano', hint: 'TEXTO DE AJUDA!',}),
      new CrudListColumn({ field: 'placa', label: 'Placa'}),
      new CrudListColumn({ field: 'modelo', label: 'Modelo'}),
      new CrudListColumn({ field: 'marca', label: 'Marca', fnShowCondition: (row:Veiculo)=> !(row.modelo.indexOf('Modelo 7') > -1), defaultValue: 'N/A!!'}),
      new CrudListColumn({ field: 'data', label: 'Fabricação', fnFormat: (v:Date) => v.toLocaleDateString(), fnShowCondition: (row:Veiculo)=> row.ano === 2001, defaultValue: '***'}),
      new CrudListColumn({ label: 'LINK', islink: true, link: (row:Veiculo) => `http://google.com.br/search?q=${row.marca}`, fnCellValue: (row:Veiculo) => `${row.marca}/${row.modelo}`, hint: 'help!!'}),
      new CrudListColumn({ field: 'marca', label: 'LINK', islink: true, link: (row:Veiculo) => `http://google.com.br/search?q=${row.marca}`,}),
      new CrudListColumn({ label: 'Marca/Modelo', fnCellValue: (row:Veiculo) => `${row.modelo} - ${row.marca}`,}),
      new CrudListColumn({ field: 'foto', image64: true, islink: true, link: (row:Veiculo) => 'http://google.com.br', label: 'Imagem', fnCellValue: (row:Veiculo) => imageService.transformB64toImage(row.foto), fnShowCondition: (row:Veiculo)=> row.foto !== null && row.foto !== undefined}),
    ]
  }

  ngOnInit(): void {
    this.buildVeiculo();
  }

  filter(filter: string): FilterParam[] {
    console.log(filter);
    const f: FilterParam[] = [
      {field: 'ano', value: filter},
      {field: 'placa', value: filter},
      {field: 'data', value: filter},
      {field: 'modelo', value: filter},
      {field: 'marca', value: filter},
    ];
    return f;
  }

  more(): Veiculo[] {
    console.log('load more records....');
    this.showMore = !this.showMore;

    const v2: Veiculo[] = [];

    for(let i = 0; i <= 10; i++) {
      v2.push(new Veiculo(2001, `MORE MORE 200${i}`,`MORE ${i}`, `GOL`, new Date(), null));
    }

    return v2;

  }

  custAction(v:Veiculo): void {
    console.log(v);
  }

  private x(v: Veiculo): void {
    console.log('Editando');
    console.log(v);
  }
  private y(v: Veiculo): void {
    console.log('Removendo');
    console.log(v);
  }
  private a(v: Veiculo): void {
    console.log('AAAA');
    console.log(v);
  }

  private buildVeiculo(): void {

    this.v = [];

    for(let i = 0; i <= 50; i++) {
      this.v.push(new Veiculo(2001, `NGN200${i}`,`Modelo ${i}`, `Toyota`, new Date(), null));
    }

  }

}
