import { Component, OnInit } from '@angular/core';
import { MyservicioService } from './myservicio.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from './books';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'servicio00';
  libros: any[];
  librosPromise: Book[];

  constructor(private myservicioService: MyservicioService) {

  }

  ngOnInit(): void {
    this.getWriterWithFavBooks();
    
  }

  recargarPagina() {
    this.getWriterWithFavBooks();
  }

  getWriterWithFavBooks() {
    this.myservicioService.getWriterWithFavBooks().subscribe(
      data => {
        
        this.libros = data;
      },
      (err: HttpErrorResponse) => {
        //si es un error de aplicacion
        if (err.error instanceof Error) {
          console.log('Error de aplicacion :', err.error.message);
        } else {
        // si es respuesta no valida del servicio
          console.log('Respuesta estado : ', err.status);
          console.log('Respuesta body:', err.error);
        }
      }

    );
  }


}
