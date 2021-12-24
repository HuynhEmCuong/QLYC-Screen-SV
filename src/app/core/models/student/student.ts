

export class UserToken implements StudentViewModel {
    createDate: string | null = ""
    modifyDate: string | null = ""
    id: number = 0
    userName: string = ''
    email: string = ''
    fullName: string = ''
    urlImage: string = ''
    idToken: string = ''
    studentId: string = ''
    studentIdNew: string = ''
    mobi: string = ""

    
}



export interface StudentViewModel {
    id: number;
    fullName: string;
    email: string;
    studentId: string;
    mobi: string;
    createDate: string | null;
    modifyDate: string | null;
}