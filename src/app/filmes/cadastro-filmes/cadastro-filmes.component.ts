import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo:['',[Validators.required, Validators.minLength(2),Validators.maxLength(256)]],
      urlFoto:['',[Validators.minLength(10)]],
      dtLancamento: ['',[Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required,Validators.min(0),Validators.max(10)]],
      urlIMDB: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });
    
    
    }

    salvar(): void{
      if(this.cadastro.invalid){
        return;
      }
      alert("Sucesso!\n\n" + JSON.stringify(this.cadastro.value,null,4));
  }
  reiniciarForm(): void{
    this.cadastro.reset();
  }

}
