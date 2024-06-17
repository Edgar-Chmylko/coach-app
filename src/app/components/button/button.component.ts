import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NzButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  title = input.required<string>();
  type = input<'primary' | 'default' | 'dashed' | 'link' | 'text'>('primary');
  disabled = input(false);

  onClick = output();
}
