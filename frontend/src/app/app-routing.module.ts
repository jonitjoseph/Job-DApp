import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';
import { CandidateComponent } from './candidate/candidate.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'candidate', component: CandidateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
