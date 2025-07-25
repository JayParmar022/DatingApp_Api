import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { ActivatedRoute } from '@angular/router';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Photo } from '../../../types/member';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos {

  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<Photo[]>;
  


  constructor(){
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if(memberId){
      this.photos$ = this.memberService.getMemberPhoto(memberId);
    }
  }

  get photoMocks(){
    return Array.from({length:20},(_,i) => ({
      url:'/user.png'
    }))
  }
}
