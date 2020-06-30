import { MemberEditComponent } from './../members/member-edit/member-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
@Injectable()
export class PreventUnsaveChangesGuard implements CanDeactivate<MemberEditComponent>{

    canDeactivate(component: MemberEditComponent):boolean{
        if(component.editForm.dirty){
            return confirm("Are You sure You Want To Continue? Anu Unsaved Changes Will be Lost.")
        }
        return true;
    }
}