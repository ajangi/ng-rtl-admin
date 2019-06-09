import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PickupComponent } from '../../components/requests/pickup/pickup.component'
import { AuthComponent } from 'src/app/components/auth/auth.component';

const routes: Routes = [
  {path : "requests/pickup", component: PickupComponent},
  {path : "login", component : AuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
