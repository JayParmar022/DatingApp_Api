import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/service/member-service';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from "../member-card/member-card";
import { paginatedResult } from '../../../types/pagination';
import { Paginator } from "../../../shared/paginator/paginator";
import { FilterModal } from '../filter-modal/filter-modal';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModal],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit{

  @ViewChild('filterModal') filterModal! : FilterModal;
  private memberService = inject(MemberService);
  protected paginatedMembers =signal<paginatedResult<Member> | null>(null);
  pageNumber = 1;
  pageSize = 5;

  protected memberParams = new MemberParams();
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.memberParams).subscribe({
      next: result => {
        this.paginatedMembers.set(result)
      }
    })
  }

  onPageChange(event: {pageNumber:number, pageSize: number}){
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageNumber;
    this.memberParams.pageSize = event.pageSize;
    this.memberParams.pageNumber = event.pageNumber;
    this.loadMembers();
  }

  openModal(){
    this.filterModal.open();
  }

  onClose(){
    console.log('Modal closed')
  }

  onFilterChange(data: MemberParams){
    this.memberParams = data;
    this.loadMembers();
  }

  resetFilters(){
    this.memberParams = new MemberParams();
    this.loadMembers();
  }
}
