import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/core/filmes.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Filme } from 'src/app/shared/models/filme';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  config: ConfigParams = {
  pagina: 0,
  limite: 4
  }
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit(): void {
    this.filtrosListagem = this.fb.group(
      {
        texto:[''],
        genero:['']
      });

    this.filtrosListagem.get('texto').valueChanges.subscribe((val: string) =>{
      this.config.pesquisa = val;
      this.resetarConsulta();
    })
    this.filtrosListagem.get('genero').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val: string) =>{
      this.config.campo = {tipo: 'genero', valor: val};
      this.resetarConsulta();
    })
    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção científica', 'Comédia', 'Drama'];
    this.listaFilmes();

  }
  onScroll(): void{
    this.listaFilmes();

  }

  abrir(id: number): void{
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listaFilmes(): void{
    this.config.pagina++;
    this.filmesService.listar(this.config).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));

  }

  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.filmes = [];
    this.listaFilmes();
  }

}
