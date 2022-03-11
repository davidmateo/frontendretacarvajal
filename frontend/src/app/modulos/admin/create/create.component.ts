import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }
    fgValidacion = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  
  ngOnInit(): void {
  }
  store(){
    let usuario = new UsuarioModelo();
    usuario.nombre = this.fgValidacion.controls["nombre"].value;
    usuario.apellido = this.fgValidacion.controls["apellidos"].value;
    usuario.correo = this.fgValidacion.controls["correo"].value;
    usuario.telefono = this.fgValidacion.controls["telefono"].value;
 
    this.usuarioService.store(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Creado correctamente!', 'Tu contraseña para iniciar sesión se envio al correo que registraste, Verifica en el Spam', 'success')
      this.router.navigate(['index']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }
}
