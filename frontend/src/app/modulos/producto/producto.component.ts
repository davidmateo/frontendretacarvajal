import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoModelo } from 'src/app/modelos/producto.model';
import { CarritoModelo } from 'src/app/modelos/carrito.model';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import Swal from 'sweetalert2'
import { CarritoService } from 'src/app/servicios/carrito.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  activeSession?:boolean = false;
  subs: Subscription = new Subscription();
  Producto: ProductoModelo[] = []
  constructor(
    private productoService: ProductoService,
    private seguridadService: SeguridadService,
    private carritoService: CarritoService) { 
   }
  getAll(){
    this.productoService.getAll().subscribe((data: ProductoModelo[]) => {
      this.Producto = data
      console.log(data)
    })
  }
  carrito(id:any){
    console.log(id);
    const usuario=localStorage.getItem("sessionData");
    if (usuario){
      const usuarioData=(JSON.parse(usuario));
      const carrito = <CarritoModelo>{
        idUsuario:usuarioData.id, 
        idProducto:id,
        estado:"active",
        fecha:(new Date()).toString()
      }
      this.carritoService.store(carrito).subscribe((data)=>{
        console.log(data);
      })
      
    }
  }


  
  ngOnInit(): void {
    this.getAll()
    this.subs = this.seguridadService.datosUsuarioSesion().subscribe((data: UsuarioModelo) => {
      console.log(data)
        this.activeSession = data.isLoggedIn;
    })
  }

}
