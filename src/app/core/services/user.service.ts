import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: UserModel[];
  resualt: Boolean = false;
  constructor(
    private localStorageService: LocalStorageService
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
  getById(id:any){
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
  update(item: any) {
    this.getParseData("users")
    this.users.find((user) => {
      if (user.id === item.id) {
        user.userName = item.userName,
        user.firstName = item.firstName,
        user.password = item.password,
        user.passconfirm= item.passconfirm,
        user.email = item.email
        this.localStorageService.setItem("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    if (this.resualt) return true;
    else return false;
  }

}
