export interface UserModel{
    id:number|null,
    firstName:string|null,
    userName:string|null,
    password:string|null,
    passconfirm?:string|null,
    email:string|null,
    img?:string|null,
    role:string|null,
    deleted:number|null,
}