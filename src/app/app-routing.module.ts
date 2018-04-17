import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
import { TagComponent } from './tag/tag.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
	{ path: '', redirectTo: '/overview', pathMatch: 'full'},
	{ path: 'overview/:name', component: OverviewComponent },
	{ path: 'details/:name/:id', component: DetailsComponent },
	{ path: 'tag/:name/:tag', component: TagComponent },
  { path: 'settings', component: SettingsComponent},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
}
