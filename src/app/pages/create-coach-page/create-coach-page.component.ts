import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CoachFormComponent } from '../../components/coach-form/coach-form.component';
import { CoachService } from '../../services/coach.service';
import { CoachFrom } from '../../models/model';
import { Router } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-create-coach-page',
  standalone: true,
  imports: [CoachFormComponent, NzDividerModule, ButtonComponent],
  templateUrl: './create-coach-page.component.html',
  styleUrl: './create-coach-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCoachPageComponent implements OnInit {
  coachService = inject(CoachService);
  router = inject(Router);

  ngOnInit() {
    this.coachService.loadCoaches().subscribe();
  }

  onSubmit(coach: CoachFrom) {
    this.coachService.addCoach(coach).subscribe({
      next: () => this.router.navigate(['']),
    });
  }

  back() {
    this.router.navigate(['']);
  }
}
