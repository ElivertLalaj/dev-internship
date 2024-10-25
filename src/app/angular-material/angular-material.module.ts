import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkDrag, CdkDropList , CdkDragHandle} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    DragDropModule,
    CdkDragHandle,
    MatSlideToggleModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    DragDropModule,
    CdkDragHandle,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class AngularMaterialModule { }
