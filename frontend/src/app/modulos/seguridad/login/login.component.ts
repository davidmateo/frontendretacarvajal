import { Component, OnInit } from '@angular/core';
import * as cryptoJS from 'crypto-js';
//importamos seguridad service
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms'
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgValidacion = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required,Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,private seguridadService: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }
  identificarUsuario() {
    let usuario = this.fgValidacion.controls["correo"].value;
    let clave = this.fgValidacion.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
//el metodo observable se debe llamar por medio de un suscribe
    this.seguridadService.login(usuario, claveCifrada).subscribe(
      (data: any) => {
        this.seguridadService.almacenarSesion(data)
        //el router.navigate me permite mover dentro componentes
        //sweetalert me permite crear alertas creativas para mi paginita
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500
        }).then(() =>{
          this.router.navigate(['/index']);
        })
      },
      (error: any) => {
        console.log(error)
        //alert("Datos inválidos");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Algo salio mal!',
        })
      } 
      );
    }
}
