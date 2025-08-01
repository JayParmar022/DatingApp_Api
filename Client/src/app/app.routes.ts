import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { MemberList } from '../features/members/member-list/member-list';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestError } from '../features/test-error/test-error';
import { NotFound } from '../shared/errors/not-found/not-found';
import { ServerError } from '../shared/errors/server-error/server-error';
import { MemberProfile } from '../features/members/member-profile/member-profile';
import { MemberPhotos } from '../features/members/member-photos/member-photos';
import { MemberMessages } from '../features/members/member-messages/member-messages';
import { memberResolver } from '../features/members/member-resolver';
import { preventUnsavedChangesGuard } from '../core/guards/prevent-unsaved-changes-guard';

export const routes: Routes = [
    {path: '', component:Home},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
            {path: 'members', component:MemberList , canActivate:[authGuard]},
            {
                path: 'members/:id',
                resolve:{member:memberResolver},
                runGuardsAndResolvers:'always',
                component:MemberDetailed, 
                canActivate:[authGuard],
                children:[
                    {path: '', redirectTo: 'profile', pathMatch: 'full'},
                    {path: 'profile', component:MemberProfile, title: 'Profile', 
                        canDeactivate : [preventUnsavedChangesGuard]},
                    {path: 'photos', component:MemberPhotos, title: 'Photos'},
                    {path: 'messages', component:MemberMessages, title: 'Messages'},
                ]
            },
            {path: 'lists',component:Lists, canActivate:[authGuard]},
            {path: 'messages',component:Messages, canActivate:[authGuard]},
        ]
    },
    {path: 'test-error', component: TestError},
    {path: 'server-error', component: ServerError},
    {path: '**', component:NotFound}
];
