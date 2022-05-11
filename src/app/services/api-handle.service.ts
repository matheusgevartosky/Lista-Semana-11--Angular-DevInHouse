import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StarWarsCharacter } from '../classes/star-wars-character';
import { CharacterInterface } from '../interfaces/character-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiHandleService {

  private url = environment.API_PATH

  constructor(private _http: HttpClient) { }

  public getPersonagens(): Observable<StarWarsCharacter[]>{
    return this._http.get<StarWarsCharacter[]>(this.url);
  }

  public obterTodos(){
    return new Promise<any>((resolve) =>{
      this._http.get(this.url)
      .subscribe(data => {
        resolve(data)
      })
    })
  }


}
