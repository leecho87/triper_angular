import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RoutesModule } from "./routes/routes.module";
import { AppComponent } from "./app.component";
import { LayoutModule } from "@app/layout/layout.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RoutesModule, LayoutModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
