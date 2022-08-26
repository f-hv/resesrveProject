import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/user.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listUsers: UserModel[];
  ///// pagination
  currentPage: any = 1;
  elementPerpage = 5;
  collectionSize: number;
  ///// search
  searchKeyWord: any;
  constructor(
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const usersLC = LocalStorageService.read("users");
    if (usersLC) {
      let users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
      if (users)
        this.listUsers = JSON.parse(users) ? JSON.parse(users) : null;
      this.listUsers = this.listUsers.filter(item => item.deleted === 0);
    }
  }
  usersById(index: any, line: any) {
    return line.id;
  }
  delete(user: any) {
    const resualt = this.userService.delete(user);
    if (resualt)
      this.toastrService.success('delete succesfull');
    else
      this.toastrService.warning('faild deleted');
    this.getData();
  }
  onKeyup(item: any) {
    if (item.keycode !== 13 || item.keycode !== 8) {
      this.searchKeyWord = item;
    }
    if (this.searchKeyWord.length === 0) {
      this.listUsers = this.userService.getData();
    }
    if (this.searchKeyWord.length > 1) {
      if (item.keycode !== 13 || item.keycode !== 8) {
        this.getData();
        this.listUsers = this.listUsers.filter(user =>
          user.userName?.includes(item) ||
          user.firstName?.includes(item) ||
          user.password?.includes(item) ||
          user.email?.includes(item)
        );
      }
    }
  }
}
