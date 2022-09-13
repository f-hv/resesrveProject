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
    return this.users = JSON.parse(LocalStorageService.read("users") || null);
  }

  getById(id: any) {
    this.getData();
    return this.users.find((user: any) => user.id === id)
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
      if (user.id === data.id) {
        user.userName = data.userName,
          user.firstName = data.firstName,
          user.password = data.password,
          user.passconfirm = data.passconfirm,
          user.email = data.email
        LocalStorageService.save("users", JSON.stringify(this.users));
        this.resualt = true;
      }
    });
    if (this.resualt) return true;
    else return false;
  }

  create(data: UserModel) {
    return LocalStorageService.addToArray("users", data);
  }
}
  // this.infoLogin .push( this.getParseData("users"));
    // console.log("info",this.infoLogin);

    // if (!this.infoLogin) {
    //   LocalStorageService.save("users", JSON.stringify(data));
    //   return true;
    // }
    // else {
    //   const validUser = this.infoLogin.find((item: any) => item.userName === data.userName || item.email === data.email);
    //   if (!validUser) {        
    //     this.infoLogin.push({
    //       id: data.id,
    //       firstName: data.firstName,
    //       userName: data.userName,
    //       password: data.password,
    //       email : data.email,
    //       role: data.role,
    //       deleted: 0
    //     });
    //     LocalStorageService.save("users", JSON.stringify(this.infoLogin));
    //     return true
    //   }
    //   else return false;
    // }

  //  } 


