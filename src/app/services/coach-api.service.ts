import { Injectable, inject } from '@angular/core';
import { Coach, CoachFrom } from '../models/model';
import { of } from 'rxjs';
import { IdGeneratorService } from './id-generator.service';

@Injectable({
  providedIn: 'root',
})
export class CoachApiService {
  idGeneratorService = inject(IdGeneratorService);

  coaches: Coach[] = [
    {
      id: 1,
      fullName: 'Penelope Randi',
      email: 'penelope.randi@coaching.com',
      managerId: null,
    },
  ];

  load() {
    return of(this.coaches);
  }

  addCoach(coach: CoachFrom) {
    const coachWithId: Coach = {
      id: this.idGeneratorService.generateId(),
      ...coach,
    };

    this.coaches.push(coachWithId);

    const responseCoach = this.coaches.find((c) => coachWithId.id === c.id)!;
    return of(responseCoach);
  }

  removeCoach(coachId: number) {
    const coachIndex = this.coaches.findIndex((c) => c.id === coachId);

    for (let coach of this.coaches) {
      if (coach.managerId === coachId) {
        const parentCoach = this.coaches.find((c) => c.id === coachId);

        if (parentCoach && parentCoach.managerId) {
          coach.managerId = parentCoach.managerId;
        } else {
          coach.managerId = null;
        }
      }
    }

    this.coaches.splice(coachIndex, 1);

    return of(true);
  }

  demoteCoach(coachId: number) {
    const coachIndex = this.coaches.findIndex((c) => c.id === coachId);
    const coach = this.coaches.find((c) => c.id === coachId);

    if (coach) {
      const managerCoach = this.coaches.find((c) => c.id === coach.managerId);
      if (managerCoach) {
        const subCoach = this.coaches.find((c) => c.id !== coachId && c.managerId === managerCoach.id);
        if (subCoach) {
          coach.managerId = subCoach.id;
        }

        this.coaches[coachIndex] = coach;
      }
    }

    const responseCoach = this.coaches.find((c) => c.id === coachId)!;
    return of(responseCoach);
  }

  promoteCoach(coachId: number) {
    const coachIndex = this.coaches.findIndex((c) => c.id === coachId);
    const coach = this.coaches.find((c) => c.id === coachId);

    if (coach) {
      const managerCoach = this.coaches.find((c) => c.id === coach.managerId);

      if (managerCoach && managerCoach.managerId) {
        coach.managerId = managerCoach.managerId;
      } else {
        coach.managerId = null;
      }

      this.coaches[coachIndex] = coach;
    }

    const responseCoach = this.coaches.find((c) => c.id === coachId)!;
    return of(responseCoach);
  }
}
