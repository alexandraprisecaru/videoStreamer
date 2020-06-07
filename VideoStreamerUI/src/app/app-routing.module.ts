import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovielistComponent } from './components/movielist/movielist.component';
import { AuthGuard } from './guards/auth.guard';
import { EmptyComponent } from './components/empty/empty.component';


const routes: Routes = [
  {
    path: "",
    component: EmptyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "movies",
    component: MovielistComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
