import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkDrag, CdkDropList , CdkDragHandle} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    DragDropModule,
    CdkDragHandle,
    MatSlideToggleModule,
    MatTableModule,
    OverlayModule,
    MatButtonToggleModule
  ],
  exports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    DragDropModule,
    CdkDragHandle,
    MatSlideToggleModule,
    MatTableModule,
    OverlayModule,
    MatButtonToggleModule
  ]
})
export class AngularMaterialModule { }
