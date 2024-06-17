import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Coach } from '../../models/model';
import { ButtonComponent } from '../button/button.component';
import { CoachService } from '../../services/coach.service';

interface CoachWithChildren {
  id: number;
  fullName: string;
  email: string;
  managerId: number | null;
  children: CoachWithChildren[];
}

@Component({
  selector: 'app-coach-list',
  standalone: true,
  imports: [NzListModule, NzIconModule, ButtonComponent, CommonModule],
  templateUrl: './coach-list.component.html',
  styleUrl: './coach-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachListComponent {
  coachService = inject(CoachService);

  coaches = input.required<Coach[]>();

  sortedCoaches = computed(() => {
    const coaches = this.coaches();
    const sortedCoaches: CoachWithChildren[] = [];
    const map = new Map<number, any>();

    coaches.forEach((coach) => {
      map.set(coach.id, { ...coach, children: [] });
    });

    coaches.forEach((coach) => {
      const node = map.get(coach.id);
      if (coach.managerId === null) {
        sortedCoaches.push(node);
      } else {
        const parent = map.get(coach.managerId);
        parent.children.push(node);
      }
    });
    return sortedCoaches;
  });

  getManagerName(managerId: number | null) {
    if (!managerId) return;
    const manager = this.coaches().find((coach) => coach.id === managerId);
    return manager ? manager.fullName : '';
  }

  removeCoach(coachId: number) {
    this.coachService.removeCoach(coachId).subscribe();
    this.coachService.loadCoaches().subscribe();
  }

  demoteCoach(coachId: number) {
    this.coachService.demoteCoach(coachId).subscribe();
    this.coachService.loadCoaches().subscribe();
  }

  promoteCoach(coachId: number) {
    this.coachService.promoteCoach(coachId).subscribe();
    this.coachService.loadCoaches().subscribe();
  }
}
