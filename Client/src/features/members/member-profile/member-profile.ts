import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/service/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/service/toast-service';
import { AccountService } from '../../../core/service/account-service';


@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit , OnDestroy{

  @ViewChild('editForm') editForm?:NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault();
    }
  }
 
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  protected toast = inject(ToastService);
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''
  }

  ngOnInit(): void {
   
    this.editableMember ={
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
    }
  }

  updateProfile(){
    if(!this.memberService.member()) return;
    const updateProfile = {...this.memberService.member(), ...this.editableMember}
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if(currentUser && updateProfile.displayName !== currentUser?.displayName){
          currentUser.displayName = updateProfile.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success('Profile Updated Success');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updateProfile as Member);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.memberService.editMode()){
      this.memberService.editMode.set(false);
    }
  }  
}
