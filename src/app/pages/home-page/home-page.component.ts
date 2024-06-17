import { CoachService } from './../../services/coach.service';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CoachListComponent } from '../../components/coach-list/coach-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ButtonComponent, NzDividerModule, CoachListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  router = inject(Router);
  coachService = inject(CoachService);

  coaches = this.coachService.coaches;

  ngOnInit() {
    this.coachService.loadCoaches().subscribe();
  }

  createCoach() {
    this.router.navigate(['create-coach']);
  }
}
