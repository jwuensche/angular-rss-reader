import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from "./login/login.component";
import { AuthGuard} from "./auth-guard.service";
import {OverviewComponent} from "./overview/overview.component";
import {TagComponent} from "./tag/tag.component";
import {DetailsComponent} from "./details/details.component";
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'overview/:name', component: OverviewComponent },
      { path: 'tag/:name/:tag', component: TagComponent },
      { path: 'details/:name/:id', component: DetailsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	exports: [ RouterModule ],
	imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {
}
