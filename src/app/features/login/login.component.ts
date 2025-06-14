import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email = '';
  public error = '';

  constructor(
    private auth: AuthService, 
    private router: Router
  ) {}

  public login() {
    if(!this.email){
      this.error = "Correo inválido. Por favor, introduzca un correo."
      return;
    }
    const success = this.auth.login(this.email);
    if (!success) {
      this.error = 'Correo inválido. Usa un correo @tecalliance.com.';
      return;
    } 
    this.router.navigateByUrl('/home');
  }
}
