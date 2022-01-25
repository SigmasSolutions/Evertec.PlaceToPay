import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseListComponent } from '@appcore/baselist.component';
import { MessageService } from '@appcore/services/message.service';
import { UserService } from './services/user.service';
import { User, UserPaged } from './services/user.object';
import { UserModalComponent } from './modals/user.modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent extends BaseListComponent<User> implements OnInit {
  listUser: UserPaged;

  constructor(readonly userService: UserService,
              readonly modalService: NgbModal,
              readonly messageService: MessageService) {
    super(userService, modalService, messageService);
  }

  ngOnInit() {
    this.$Modal = UserModalComponent;
    this.$ListOrdered = () => {
      this.userService.getPagedOrderedSort(this.page, this.sort, this.numberRecords, this.filters)
             .subscribe((res: UserPaged) => { this.listUser = res; });
    };
    this.$ListOrdered();
  }

  onDelete(item: User) { this.Delete(item.idUser); }
}
