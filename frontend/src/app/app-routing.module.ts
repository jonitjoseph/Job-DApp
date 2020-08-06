import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EmployerComponent } from './employer/employer.component';
import { CandidateComponent } from './candidate/candidate.component';
import { HomeComponent } from './home/home.component';
import { PerfMatrixComponent } from './perf-matrix/perf-matrix.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'employer', component: EmployerComponent },
  { path: 'candidate/:jobId', component: CandidateComponent },
  { path: 'perfMatrix/:candAddress/:jobId', component: PerfMatrixComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
