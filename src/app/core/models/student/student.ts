

export class UserToken implements StudentViewModel {
    departId: number | null = 0;
    createDate: string | null = "";
    modifyDate: string | null = "";
    id: number = 0;
    userName: string = '';
    email: string = '';
    fullName: string = '';
    urlImage: string = '';
    idToken: string = '';
    studentId: string = '';
    studentIdNew: string = '';
    mobi: string = "";
}



export interface StudentViewModel {

    id: number;
    fullName: string;
    email: string;
    studentId: string;
    departId: number | null;
    mobi: string;
    createDate: string | null;
    modifyDate: string | null;
}