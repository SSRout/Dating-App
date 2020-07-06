import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { User } from './_models/user';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { PreventUnsaveChangesGuard } from './_guards/prevent-unsave-changes.guard';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';

export const appRoutes: Routes = [
    {path:"",component:HomeComponent},
    {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[AuthGuard],
        children:[
            {path:"members",component:MemberListComponent,resolve:{users:MemberListResolver}},
            {path:"members/:id",component:MemberDetailsComponent,resolve:{user:MemberDetailResolver}},
            {path:"memeber/edit",component:MemberEditComponent,resolve:{user:MemberEditResolver}
            ,canDeactivate:[PreventUnsaveChangesGuard]},
            {path:"messages",component:MessagesComponent,resolve:{messages:MessagesResolver}},
            {path:"lists",component:ListsComponent,resolve:{users:ListsResolver}},
        ]
    },
    // {path:"members",component:MemberListComponent,canActivate:[AuthGuard]},
    // {path:"messages",component:MessagesComponent,canActivate:[AuthGuard]},
    // {path:"lists",component:ListsComponent,canActivate:[AuthGuard]},
    {path:"**",redirectTo:"",pathMatch:"full"}
];
 