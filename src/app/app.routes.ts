import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { SeriesComponent } from './components/series/series.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { SeriesDetailsComponent } from './components/series-details/series-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "movies", component: MoviesComponent },
    { path: "series", component: SeriesComponent },
    { path: "contactUs", component: ContactUsComponent },
    { path: "signIn", component: SignInComponent },
    { path: "signUp", component: SignUpComponent },
    { path: "myList", component: FavouritesComponent },
    { path: "movie-details/:id", component: MovieDetailsComponent },
    { path: "series-details/:id", component: SeriesDetailsComponent },
    { path: "**", component: NotFoundComponent }
];
