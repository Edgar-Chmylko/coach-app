import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  private id = 1;

  generateId() {
    return (this.id += 1);
  }
}
