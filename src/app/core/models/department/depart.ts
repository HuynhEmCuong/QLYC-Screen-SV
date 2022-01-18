import { Status } from "../enum/status";

export interface Department {
    id: number;
    name: string;
    note: string;
    status: Status;
    createDate: string;
}