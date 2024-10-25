import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     AppModule, 
     AngularMaterialModule
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dev-intership';
  squareColor: string = 'lightblue';
  clickCount: number = 0;
  undocolor: string[] = [];
  redocolor: string[] = [];
  lastUndoColor: string | null = null;
  lastRedoColor: string | null = null;


  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === 'undoList') {
      moveItemInArray(this.undocolor, event.previousIndex, event.currentIndex);
    } else if (event.container.id === 'redoList') {
      moveItemInArray(this.redocolor, event.previousIndex, event.currentIndex);
    }
  }

  ClickChangeColor(): void {

    this.clickCount++;
    let newColor = this.RandomColor();

    if (this.squareColor) {
      this.undocolor.push(this.squareColor);
      this.lastUndoColor = this.squareColor;
    }

    this.squareColor = newColor;

    this.redocolor = [];
    this.lastRedoColor = null;

  }

  RandomColor(): string {
    let color: string;

    color = '#';
    let letters = '0123456789ABCDEF';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }


  onUndoClick() {
    if (this.undocolor.length > 0) {
      const lastUndoColor = this.undocolor.pop() || 'lightblue';
      if (this.squareColor) {
        this.redocolor.push(this.squareColor);
        this.lastRedoColor = this.squareColor;
      }
      this.squareColor = lastUndoColor;
      this.lastUndoColor = this.undocolor[this.undocolor.length - 1] || null;

    }
  }

  onRedoClick() {
    if (this.redocolor.length > 0) {
      const lastRedoColor = this.redocolor.pop() || 'lightblue';
      if (this.squareColor) {
        this.undocolor.push(this.squareColor);
        this.lastUndoColor = this.squareColor;
      }
      this.squareColor = lastRedoColor;
      this.lastRedoColor = this.redocolor[this.redocolor.length - 1] || null;
    }
  }
}
