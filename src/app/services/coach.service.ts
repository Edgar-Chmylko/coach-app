import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { createStore } from '@ngneat/elf';
import {
  withEntities,
  selectAllEntities,
  setEntities,
  addEntities,
  selectEntity,
  deleteEntities,
  updateEntities,
} from '@ngneat/elf-entities';
import { Coach, CoachFrom } from '../models/model';
import { CoachApiService } from './coach-api.service';
import { tap } from 'rxjs';

const store = createStore({ name: 'coaches' }, withEntities<Coach>());

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  coachApi = inject(CoachApiService);

  coaches = toSignal(store.pipe(selectAllEntities()), { requireSync: true });
  managerName = (managerId: number) =>
    store.pipe(selectEntity(managerId, { pluck: 'fullName' }));

  loadCoaches() {
    return this.coachApi.load().pipe(
      tap((response) => {
        store.update(setEntities(response));
      })
    );
  }

  addCoach(coach: CoachFrom) {
    return this.coachApi
      .addCoach(coach)
      .pipe(tap((res) => store.update(addEntities(res))));
  }

  removeCoach(coachId: number) {
    return this.coachApi
      .removeCoach(coachId)
      .pipe(tap(() => store.update(deleteEntities(coachId))));
  }

  demoteCoach(coachId: number) {
    return this.coachApi
      .demoteCoach(coachId)
      .pipe(tap((res) => store.update(updateEntities(res.id, {}))));
  }

  promoteCoach(coachId: number) {
    return this.coachApi
      .promoteCoach(coachId)
      .pipe(tap((res) => store.update(updateEntities(res.id, {}))));
  }
}
