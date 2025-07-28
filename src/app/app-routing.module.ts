import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsListComponent } from './components/parts-list/parts-list.component';
import { PartFormComponent } from './components/part-form/part-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/parts', pathMatch: 'full' },
  { path: 'parts', component: PartsListComponent },
  { path: 'parts/new', component: PartFormComponent },
  { path: 'parts/edit/:code', component: PartFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}