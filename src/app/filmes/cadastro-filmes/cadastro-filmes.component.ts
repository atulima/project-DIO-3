import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(public validacao: ValidarCamposService,
     private fb: FormBuilder,
     private filmeService:FilmesService,
     public dialog: MatDialog,
     private router: Router) { }

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
    
    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Drama'];
    
    }

    submit(): void{
      if(this.cadastro.invalid){
        return;
      }
      const filme = this.cadastro.getRawValue() as Filme;
      this.salvar(filme)
  }
  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void{
      this.filmeService.salvar(filme).subscribe(() => {
        const config = {
          data:{
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo filme',
            corBtnCancelar: 'primary',
            possuirBtnFechar: true
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if(opcao) {
            this.router.navigateByUrl('filmes');

          } else {
            this.reiniciarForm();
          }
        });
      },
      () => {
        const config = {
          data:{
            titulo: 'Erro ao salvar o registro',
            descricao: 'Não conseguimos salvar o seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar',
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      });
    }
  }


