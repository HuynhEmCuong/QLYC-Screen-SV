import { NgModule } from "@angular/core";
import { TaskStatusPipe } from "../pipe/task-status.pipe";

@NgModule({
    declarations:[
        TaskStatusPipe
    ],
    imports:[],
    exports:[TaskStatusPipe]

})


export class SharedModule{}