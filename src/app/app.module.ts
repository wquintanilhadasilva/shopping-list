import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WngxFilterModule, WfilterPipe } from 'wngx-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CadastroComponent } from './crud/cadastro/cadastro.component';
import { LeituraComponent } from './crud/leitura/leitura.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LeituraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WngxFilterModule,
    SharedModule,
  ],
  providers: [
    WfilterPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
