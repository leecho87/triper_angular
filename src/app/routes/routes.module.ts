import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@app/layout/layout.component";
import { HeaderComponent } from "@app/layout/component/header/header.component";
import { CitiesComponent } from "./cities/cities.component";
import { HomeComponent } from "./home/home.component";
import { FestivalComponent } from "./festival/festival.component";
import { CourseComponent } from "./course/course.component";
import { StayComponent } from "./stay/stay.component";
import { SearchComponent } from "./search/search.component";
import { RestaurantComponent } from "./restaurant/restaurant.component";
import { AroundComponent } from "./around/around.component";
import { AroundListComponent } from "./around/around-list/around-list.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
        data: { animation: "pageHome" },
      },
      {
        path: "search",
        component: SearchComponent,
        data: { animation: "pageSearch" },
      },
      { path: "around", component: AroundComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    HeaderComponent,
    CitiesComponent,
    HomeComponent,
    FestivalComponent,
    CourseComponent,
    StayComponent,
    SearchComponent,
    RestaurantComponent,
    AroundComponent,
    AroundListComponent,
  ],
})
export class RoutesModule {}
