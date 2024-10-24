import { Component, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CdkDragDrop, DragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    AppModule,
    AngularMaterialModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dev-intership';
  squareColor: string = "lightblue"
  clickCount: number = 0
  undocolor: string[] = []
  undoColorDragDrop1: string[] = []
  undoColorDragDrop: string[] = []
  maxUndoColor: number = 1
  redocolor: string[] = []
  redoColorDragDrop: string[] = []
  colors: string[] = []


  ClickChangeColor(): void {
    this.clickCount++;
    this.squareColor = this.RandomColor()
    console.log(this.squareColor)
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.colors, event.previousIndex, event.currentIndex);

  }


  RandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    if (this.undocolor.length >= this.maxUndoColor) {
      this.undocolor.shift();
      this.redocolor.shift()

    }

    if (this.squareColor) {
      this.undocolor.push(this.squareColor);
      this.redocolor.push(color)
      this.colors.push(color)
    }

    for(let i = 0 ; i <= this.undocolor.length ; i++){
      let undo = this.undocolor[i]
      this.undoColorDragDrop1.push(undo);

    }
    this.undoColorDragDrop = this.undoColorDragDrop1



    for(let i = 0 ; i <= this.redocolor.length ; i++){
      let redo = this.redocolor[i]
      this.redoColorDragDrop.push(redo);
    }
   


    console.log(this.undocolor)
    return color
  }


  onUndoClick() {
    this.squareColor = this.undocolor[0]
  }

  onRedoClick() {
    this.squareColor = this.redocolor[0]
  }
}
