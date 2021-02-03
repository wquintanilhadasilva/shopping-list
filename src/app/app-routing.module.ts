import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './crud/cadastro/cadastro.component';
import { LeituraComponent } from './crud/leitura/leitura.component';

const routes: Routes = [
  {
    path: "cadastro",
    component: CadastroComponent,
    data: {
      msg: "Minha página de cadastro",
      active: false,
      customAttribute: "XPTO"
    }
  },
  {
    path: "leitura",
    component: LeituraComponent,
    data: { msg: "Agora estou em Leitura", active: true }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
