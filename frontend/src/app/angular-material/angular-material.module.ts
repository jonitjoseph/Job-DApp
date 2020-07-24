import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
// import {
//   MatCheckboxModule,
//   MatSelectModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
// } from '@angular/material';

  // MatDatepickerModule,
  // MatNativeDateModule,
  // MatCheckboxModule,
  // MatSelectModule,

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
  ],
})
export class AngularMaterialModule {}
