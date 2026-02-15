import { MessagesResolver } from './_resolver/messages.resolver';
import { ListsResolver } from './_resolver/lists.resolver';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_serviceces/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { appRoutes } from './routes';
import { AuthService } from './_serviceces/auth.service';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { UserService } from './_serviceces/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_serviceces/alertify.service';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { PreventUnsaveChangesGuard } from './_guards/prevent-unsave-changes.guard';
import { TimeAgoPipe } from './_helpers/time-ago.pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessagesComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver,
    AlertifyService,
    AuthGuard,
    PreventUnsaveChangesGuard,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
