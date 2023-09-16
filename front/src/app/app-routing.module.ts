import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./containers/not-found/not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', component:NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
