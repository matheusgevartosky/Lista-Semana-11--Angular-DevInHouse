import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StarWarsCharacter } from 'src/app/classes/star-wars-character';
import { CharacterInterface } from 'src/app/interfaces/character-interface';
import { ApiHandleService } from 'src/app/services/api-handle.service';


@Component({
  selector: 'app-star-wars-character',
  templateUrl: './star-wars-character.component.html',
  styleUrls: ['./star-wars-character.component.scss']
})
export class StarWarsCharacterComponent implements OnInit {
  public personagem!: CharacterInterface[]
  public allChar: CharacterInterface[] = []
  public data!: CharacterInterface[]
  public controller:boolean = false

  public form:FormGroup = this.fb.group({
    id:[],
    nome:[''],
    habilidade: [''],
    planeta: [''],
    armas: [''],
    avatar: ['']
  })


  constructor(private _api: ApiHandleService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  public getAllCharacters(){
    this.controller = false

    this._api.getPersonagens()
    .subscribe(
      retorno =>{
        this.personagem = retorno
      }

    )}

    async pegarTodos(){
      const DATA = await this._api.obterTodos();
      this.allChar = DATA
      console.log(this.allChar)
    }

    getById() {
      this._api.getById(1).subscribe((data:any) => {
        this.data = data;
        console.log(this.data)
      })
      this.getAllCharacters()
    }

    update(): void {
      console.log(this.form.value)
      this._api.update(this.form.value.id, this.form.value)
        .subscribe();
        location.reload()}

    CriaPersonagem(){
      this._api.create(this.form.value)
      .subscribe();
      location.reload()
    }

    DeletaPersonagem(){
      this._api.delete(this.form.value.id).subscribe();
      location.reload()
    }

    showForm(){
      this.controller = !this.controller
    }
}
