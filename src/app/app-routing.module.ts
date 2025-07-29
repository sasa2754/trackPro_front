import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsListComponent } from './components/parts-list/parts-list.component';
import { PartFormComponent } from './components/part-form/part-form.component';
import { MovePartComponent } from './components/move-part/move-part.component';
import { PartHistoryComponent } from './components/part-history/part-history.component';
import { StationsListComponent } from './components/station-list/station-list.component';
import { StationFormComponent } from './components/station-form/station-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/parts', pathMatch: 'full' },
  { path: 'parts', component: PartsListComponent },
  { path: 'parts/new', component: PartFormComponent },
  { path: 'parts/edit/:code', component: PartFormComponent },
  { path: 'parts/move/:code', component: MovePartComponent },
  { path: 'parts/history/:code', component: PartHistoryComponent },
  { path: 'stations', component: StationsListComponent },
  { path: 'stations/new', component: StationFormComponent },
  { path: 'stations/edit/:id', component: StationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}