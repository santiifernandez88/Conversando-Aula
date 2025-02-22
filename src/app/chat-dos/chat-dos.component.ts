import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Mensaje } from '../models/mensaje';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { IonContent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ChatDosService } from '../services/chat-dos.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [IonIcon, IonButton, IonContent, FormsModule, CommonModule],
  templateUrl: './chat-dos.component.html',
  styleUrl: './chat-dos.component.scss'
})
export class ChatDosComponent implements OnInit, AfterViewChecked{

  public mensajeNuevo : string = "";
  public fecha : Date = new Date();
  public mensaje : Mensaje = {
    emisor : "",
    fecha : "",
    texto : ""
  }
  public mensajesBD : Mensaje[] = [];
  isChatHidden: boolean = true;

  @ViewChild('chatBody')
  private chatBody: ElementRef | undefined;

  constructor(public auth : AuthService, public chat : ChatDosService, private router: Router){ addIcons({arrowBackCircleOutline})}
  
  
  ngOnInit() {
    this.chat.obtenerChatDos().subscribe((respuesta) =>   {
      this.mensajesBD = respuesta;
    });
    console.log(this.mensajesBD);
  }

  EnviarMensaje(){

    if(this.mensajeNuevo != "")
    {
      this.mensaje.emisor = this.auth.getUserEmail();
      this.mensaje.fecha = this.formatDate(this.fecha);
      this.mensaje.texto = this.mensajeNuevo;
      this.chat.agregarChatDos(this.mensaje);
      
    }
  }


   formatDate(date: Date): string {
    // Obtener las partes de la fecha
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses en JavaScript son 0-indexados, por lo que sumamos 1.
    const year = date.getFullYear();

    // Formatear las partes de la fecha para que siempre tengan dos dígitos
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    // Construir la cadena final con el formato deseado
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${formattedDay}/${formattedMonth}/${year}`;
  }

  toggleChat() {
    if(this.isChatHidden == false){
      this.isChatHidden = true;
    }
    else
    {
      this.isChatHidden = false;
    }
  }

  ngAfterViewChecked() {
    this.desplazarAlFinal();
  }

  private desplazarAlFinal() {
    if (this.chatBody) {
      const contenedor = this.chatBody.nativeElement;
      contenedor.scrollTop = contenedor.scrollHeight;
    }
  }

  back(){
    this.router.navigate(['tabs/tab1']);
  }

}
