import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Message } from '../../models/message.interface';
import { MessagesService } from '../../services/messages.service';

// Vista base para el contacto con la tienda.
@Component({
  selector: 'app-contact-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactPageComponent {
  // Estado del formulario basado en plantilla.
  private readonly messagesService = inject(MessagesService);

  protected formModel: Message = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
  };

  protected isSubmitting = false;
  protected isSubmitted = false;
  protected successMessage = '';
  protected errorMessage = '';

  protected showFieldError(control: NgModel): boolean {
    return Boolean(control.invalid && (control.touched || this.isSubmitted));
  }

  protected submitForm(form: NgForm): void {
    this.isSubmitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: Message = {
      nombre: this.formModel.nombre.trim(),
      correo: this.formModel.correo.trim().toLowerCase(),
      asunto: this.formModel.asunto.trim(),
      mensaje: this.formModel.mensaje.trim(),
    };

    this.messagesService.sendMessage(payload).subscribe({
      next: () => {
        this.successMessage = 'Tu mensaje fue enviado correctamente.';
        this.isSubmitting = false;
        this.isSubmitted = false;
        this.formModel = {
          nombre: '',
          correo: '',
          asunto: '',
          mensaje: '',
        };
        form.resetForm(this.formModel);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ?? 'No fue posible enviar el mensaje.';
        this.isSubmitting = false;
      },
    });
  }
}
