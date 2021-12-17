export class UserToken{
    userName:string =''
    email:string =''
    fullName:string =''
    urlImage:string =''
    idToken:string =''

    getFullName(lastName:string ='' , firstName:string =''){
        this.fullName = firstName +' ' + lastName
    }
}