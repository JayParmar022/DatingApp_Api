import { Component, input } from '@angular/core';
import { Member } from '../../../types/member';
import { RouterModule } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-card',
  imports: [RouterModule,AgePipe],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css'
})
export class MemberCard {

  member = input.required<Member>();
}
