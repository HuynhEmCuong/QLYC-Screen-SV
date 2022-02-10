import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guard/auth.guard";
import { CheckUserResolver } from "./core/resolver/check-user.resolver";
import { LoginComponent } from "./views/login/login.component";
import { MainComponent } from "./views/task-component/main/main.component";


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        canActivate:[AuthGuard],
        component: MainComponent,
        resolve:{
            checkUser :CheckUserResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule { }