import { NgModule } from "@angular/core";
import { CompactFilePipe } from "../pipe/compact-file.pipe";
import { TaskStatusPipe } from "../pipe/task-status.pipe";

@NgModule({
    declarations: [
        TaskStatusPipe,
        CompactFilePipe
    ],
    imports: [],
    exports: [TaskStatusPipe,
        CompactFilePipe]

})


export class SharedModule { }