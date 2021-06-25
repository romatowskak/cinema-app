import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from 'src/app/shared/models/Movie';
import { User } from 'src/app/shared/models/User';
import { MovieRating } from 'src/app/shared/models/MovieRating';
import { MoviePhoto } from '../../shared/models/MoviePhoto';
import { AuditoriumSeat } from '../../shared/models/AuditoriumSeat';
import { CinemaAuditorium } from '../../shared/models/CinemaAuditorium';
import { MovieReservation } from '../../shared/models/MovieReservation';
import { MovieScreening } from '../../shared/models/MovieScreening';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  public getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  public getMovieDetails(movieId: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${environment.apiUrl}/movies/${movieId}`);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.put<Movie>(`${environment.apiUrl}/movies/${+movie.id}`, movie);
  }

  public removeMovie(movieId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/movies/${movieId}`);
  }

  public addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(`${environment.apiUrl}/movies`, movie);
  }

  public uploadPhotos(photos): Observable<MoviePhoto[]> {
    let data = new FormData();
    photos.forEach((photo) => data.append('files', photo.file));
    return this.httpClient.post<MoviePhoto[]>(`${environment.apiUrl}/upload`, data);
  }

  public getRatings(): Observable<MovieRating[]> {
    return this.httpClient.get<MovieRating[]>(`${environment.apiUrl}/ratings`);
  }

  public addRating(value: number, movie: Movie, user: User): Observable<MovieRating> {
    const rating = { value, user: user.user, movie };
    return this.httpClient.post<MovieRating>(`${environment.apiUrl}/ratings`, rating);
  }

  public updateRating(rating: MovieRating): Observable<MovieRating> {
    return this.httpClient.put<MovieRating>(`${environment.apiUrl}/ratings/${rating.id}`, rating);
  }

  public addSeat(seat: AuditoriumSeat): Observable<AuditoriumSeat> {
    return this.httpClient.post<AuditoriumSeat>(`${environment.apiUrl}/seats`, seat);
  }

  public getAuditorium(auditoriumId: number): Observable<CinemaAuditorium> {
    return this.httpClient.get<CinemaAuditorium>(`${environment.apiUrl}/auditoriums/${auditoriumId}`);
  }

  public getReservations(): Observable<MovieReservation[]> {
    return this.httpClient.get<MovieReservation[]>(`${environment.apiUrl}/reservations`);
  }

  public addReservation(reservation: MovieReservation): Observable<MovieReservation> {
    return this.httpClient.post<MovieReservation>(`${environment.apiUrl}/reservations`, reservation);
  }

  public getScreening(screeningId: number): Observable<MovieScreening> {
    return this.httpClient.get<MovieScreening>(`${environment.apiUrl}/screenings/${screeningId}`);
  }
}
