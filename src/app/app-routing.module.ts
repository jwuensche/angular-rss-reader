import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
	{ path: '', redirectTo: '/overview', pathMatch: 'full'},
	{ path: 'overview', component: OverviewComponent },
	{ path: 'details/:id', component: DetailsComponent },
	{ path: 'tag/:tag', component: TagComponent }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
}