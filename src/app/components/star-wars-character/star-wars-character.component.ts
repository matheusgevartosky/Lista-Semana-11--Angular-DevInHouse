import { Component, OnInit } from '@angular/core';
import { StarWarsCharacter } from 'src/app/classes/star-wars-character';
import { CharacterInterface } from 'src/app/interfaces/character-interface';
import { ApiHandleService } from 'src/app/services/api-handle.service';


@Component({
  selector: 'app-star-wars-character',
  templateUrl: './star-wars-character.component.html',
  styleUrls: ['./star-wars-character.component.scss']
})
export class StarWarsCharacterComponent implements OnInit {
  public personagem: StarWarsCharacter[] = []
  public allChar: CharacterInterface[] = []

  constructor(private _api: ApiHandleService) { }

  ngOnInit(): void {
    this.getAllCharacters()
    this.pegarTodos()
  }

  public getAllCharacters(){
    this._api.getPersonagens()
    .subscribe(
      retorno =>{
        this.personagem = retorno.map(char =>{
          return new StarWarsCharacter(
            char.id,
            char.nome,
            char.habilidade,
            char.armas,
            char.planeta,
            char.avatar
          )
        })
      }
    )}

    async pegarTodos(){
      const DATA = await this._api.obterTodos();
      this.allChar = DATA
      console.log(this.allChar)
    }


}
