import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CdkDrag, CdkDropList , CdkDragHandle} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';


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
    MatButtonToggleModule,
    ScrollingModule
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
    MatButtonToggleModule,
    ScrollingModule
  ]
})
export class AngularMaterialModule { }
