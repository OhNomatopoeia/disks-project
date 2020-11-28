import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectedDetailsComponent } from './selected-details/selected-details.component';
import { HomepageComponent } from './homepage/homepage.component'
const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'selected-album/:albumId', component: SelectedDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
