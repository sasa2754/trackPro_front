import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsListComponent } from './components/parts-list/parts-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/parts', pathMatch: 'full' },
  { path: 'parts', component: PartsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}