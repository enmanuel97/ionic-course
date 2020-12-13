import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import {environment} from '../../environments/environment';


const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

// const headers = new HttpHeaders({
//   'X-Api-Key': apiKey,
//   'Access-Control-Allow-Origin': '*'
// });

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiURL + query+`&apiKey=${apiKey}`;
    return this.http.get<T>(query);
  }

  getTopHeadlines() {

    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=us&page${this.headlinesPage}`);
  }

  getTopHeadlinesCategoria(categoria: string) {

    if(this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
