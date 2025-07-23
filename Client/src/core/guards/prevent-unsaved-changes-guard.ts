import { CanDeactivateFn } from '@angular/router';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberProfile> = (component) => {
  if(component.editForm?.dirty){
    return confirm('Are you sure you want to Continue? All Unsaved Chnges Will be lost');
  }
  
  return true;
};
