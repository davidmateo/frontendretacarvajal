import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoModelo } from '../modelos/carrito.model';
import { SeguridadService } from './seguridad.service';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {

    url = "http://localhost:3000"
    token: string = ''
    constructor(private http: HttpClient,
      private seguridadService: SeguridadService) {
        this.token = this.seguridadService.getToken();
       }
       getAll(): Observable<CarritoModelo[]>{
        return this.http.get<CarritoModelo[]>(`${this.url}/carrito`, {
          
          headers: new HttpHeaders({
            "Authorization": `Bearer ${this.token}`
          })
        })
      }
      store(carrito: CarritoModelo): Observable<CarritoModelo> {
        return this.http.post<CarritoModelo>(`${this.url}/carritos`, {
          idUsuario: carrito.idUsuario,
          idProducto: carrito.idProducto,
          estado: carrito.estado,
          fecha: carrito.fecha
        });
      }
      miCarrito(){
        const usuario=localStorage.getItem("sessionData");
          const usuarioData=(JSON.parse(usuario?usuario:"0"));
          return this.http.get<CarritoModelo[]>(`${this.url}/micarrito/${usuario}`, {
          
            headers: new HttpHeaders({
              "Authorization":`Bearer ${this.token}`
            })
          })
      }
  
  }
  
