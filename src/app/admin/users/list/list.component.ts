import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/core/models/user.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

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
  constructor(
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const usersLC = this.localStorageService.getItem("users");

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
    const usersLC = this.localStorageService.getItem("users");
    if (usersLC) {
      let users = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
      if (users)
        users = JSON.parse(users) ? JSON.parse(users) : null;
      const validUser = users.find((item: any) => item.userName === user.userName || item.email === user.email);
      if (validUser) {


      }
      // if (resualt)
      //   this.toastrService.success('delete succesfull');
      // else
      //   this.toastrService.warning('fail deleted');
    }

  }
