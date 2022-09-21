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
  infoLogin: UserModel[] = [];
  constructor(
    private localStorageService: LocalStorageService,
  ) { }


  getData() {
    return this.users = JSON.parse(LocalStorageService.read("users"));
  }

  getById(id: any) {
    this.getData();
    return this.users.find((user: any) => user.id === id)
  }
  create(data: UserModel) {
    debugger
    this.users = JSON.parse(LocalStorageService.read("users"));
    if (this.users == null) {
      const list: UserModel[] = [];
      data.id = 1;
      list.push(data);
      LocalStorageService.save("users", JSON.stringify(list));
      return true
    }
    else {
      data.id = this.users.length +1;
      const validUser = this.users.find((item: any) => item.userName === data.userName || item.email === data.email)
      return validUser ? this.update(data) && true  : LocalStorageService.addToArray("users", data) && true;
    }
  }

  delete(item: any) {
    this.getData();
    this.users.find((user) => {
      if (user.userName === item.userName && user.email === item.email) {
        user.deleted = 1;
        LocalStorageService.save("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    if (this.resualt) return true;
    else return false;
  }

  update(data: any) {
    this.getData();
    this.users.find((user) => {
      if (user.id === data.id || (user.userName == data.userName && user.email == data.email)) {
        user.userName = data.userName,
        user.firstName = data.firstName,
        user.password = data.password,
        user.passconfirm = data.passconfirm,
        user.email = data.email
        LocalStorageService.save("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    return this.resualt ? true : false;
  }


}

