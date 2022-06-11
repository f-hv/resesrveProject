import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserModel[];
  resualt: Boolean = false;
  userInfo: UserModel;
  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  getParseData(item: any) {
    const usersLC = this.localStorageService.getItem(item);
    if (usersLC) {
      let dataUser = JSON.parse(usersLC) ? JSON.parse(usersLC) : null;
      if (dataUser)
        return this.users = JSON.parse(dataUser) ? JSON.parse(dataUser) : null;
    }
    else return false;
  }
  getById(id: any) {
    this.getParseData("users");
    return this.users.find((user: any) => user.id === id)
  }
  delete(item: any) {
    this.getParseData("users")
    this.users.find((user) => {
      if (user.userName === item.userName && user.email === item.email) {
        user.deleted = 1;
        this.localStorageService.setItem("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    if (this.resualt) return true;
    else return false;
  }

  getOrginalList() {
    return this.getParseData("users");
  }
  update(data: any) {
    this.getParseData("users")
    this.users.find((user) => {
      if (user.id === data.id) {
        user.userName = data.userName,
          user.firstName = data.firstName,
          user.password = data.password,
          user.passconfirm = data.passconfirm,
          user.email = data.email
        this.localStorageService.setItem("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    if (this.resualt) return true;
    else return false;
  }

  create(data: UserModel) {
    debugger
    let users = this.getParseData("users");
    if (!this.users) {
      this.localStorageService.setItem("users", JSON.stringify(data));
      return true;
    }
    else {
      const validUser = users.find((item: any) => item.userName === data.userName || item.email === data.email);
      if (!validUser) {
        
        users.push({
          id: data.id,
          firstName: data.firstName,
          userName: data.userName,
          password: data.password,
          passConfirm: data.passconfirm,
          role: data.role,
          deleted: 0
        });
        this.localStorageService.setItem("users", JSON.stringify(users));
        return true
      }
      else return false;
    }
  }
}
