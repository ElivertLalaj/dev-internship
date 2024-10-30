import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppModule, AngularMaterialModule],
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

  isOpenUndo = false;
  isOpenRedo = false;

  private startX: number = 0;
  private startY: number = 0;


  closeUndoNav() {
    this.isOpenUndo = false;
  }

  closeRedoNav() {
    this.isOpenRedo = false;
  }

  trackItem(index: number, item: string): string {
    return item;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateLargeBoxes();
  }

  ClickChangeColor(): void {
    this.clickCount++;
    const newColor = this.RandomColor();

    if (this.squareColor) {
      this.undocolor.unshift(this.squareColor);
      this.lastUndoColor = this.undocolor[0];
    }

    this.squareColor = newColor;
    this.redocolor = [];
    this.lastRedoColor = null;

    this.updateLargeBoxes();
  }

  RandomColor(): string {
    const avoidedColors: string[] = [
      'hsl(0, 100%, 50%)',   
      'hsl(120, 100%, 50%)', 
      'hsl(240, 100%, 50%)', 
      'hsl(0, 0%, 0%)',      
      'hsl(0, 0%, 100%)'     
    ];

    const veryDarkThreshold = 25; 
    const veryLightThreshold = 75; 

    const isValidColor = (hue: number, saturation: number, lightness: number): boolean => {
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      return !avoidedColors.includes(color) && lightness >= veryDarkThreshold && lightness <= veryLightThreshold;
    };

    let color: string | null = null; 
    let valid = false;

    while (!valid) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 100);
      const lightness = Math.floor(Math.random() * 100);
      
      if (isValidColor(hue, saturation, lightness)) {
        color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        valid = true; 
      }
    }

    return color as string; 
  }

  onUndoClick() {
    if (this.undocolor.length > 0) {
      const lastUndoColor = this.undocolor.shift() || 'lightblue';
      if (this.squareColor) {
        this.redocolor.unshift(this.squareColor);
        this.lastRedoColor = this.redocolor[0];
      }
      this.squareColor = lastUndoColor;
      this.lastUndoColor = this.undocolor[0] || null;
    }
    this.updateLargeBoxes();
  }

  onRedoClick() {
    if (this.redocolor.length > 0) {
      const lastRedoColor = this.redocolor.shift() || 'lightblue';
      if (this.squareColor) {
        this.undocolor.unshift(this.squareColor);
        this.lastUndoColor = this.undocolor[0];
      }
      this.squareColor = lastRedoColor;
      this.lastRedoColor = this.redocolor[0] || null;
    }
    this.updateLargeBoxes();
  }

  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent, color: string, direction: 'undoToRedo' | 'redoToUndo'): void {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = endX - this.startX;
    const diffY = endY - this.startY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
      if (direction === 'undoToRedo' && diffX > 0) {
        this.swapColor(color, 'undoToRedo');
      } else if (direction === 'redoToUndo' && diffX < 0) {
        this.swapColor(color, 'redoToUndo');
      }
    }
  }

  swapColor(color: string, direction: 'undoToRedo' | 'redoToUndo') {
    if (direction === 'undoToRedo') {
      this.moveColor(color, this.undocolor, this.redocolor);
      this.lastUndoColor = this.undocolor[0] || null;
    } else if (direction === 'redoToUndo') {
      this.moveColor(color, this.redocolor, this.undocolor);
      this.lastRedoColor = this.redocolor[0] || null;
    }
  }

  private moveColor(color: string, source: string[], target: string[]) {
    const index = source.indexOf(color);
    if (index > -1) {
      source.splice(index, 1); 
      target.unshift(color);  
    }
  }

  updateLargeBoxes() {
    this.lastUndoColor = this.undocolor.length > 0 ? this.undocolor[0] : null;
    this.lastRedoColor = this.redocolor.length > 0 ? this.redocolor[0] : null;
  }

 
}
