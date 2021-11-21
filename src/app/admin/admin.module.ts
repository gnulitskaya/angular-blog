import { SharedModule } from './../shared/components/shared.module';
import { AuthService } from './shared/components/admin-layout/services/auth.service';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    EditPageComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent},
          {path: 'create', component: CreatePageComponent},
          {path: 'post/:id/edit', component: EditPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthService]
})

export class AdminModule {

}
