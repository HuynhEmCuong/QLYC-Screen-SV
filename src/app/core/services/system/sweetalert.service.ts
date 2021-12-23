import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

constructor() { }

success(title?: string, text?: string, timer: number = 3000) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
  });
}

successNoProcess(title?: string, text?: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    showConfirmButton: false,
    timer: 1000,
  });
}

error(title?: string, text?: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    // showConfirmButton: false
  });
}
warning(title?: string, text?: string) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    // showConfirmButton: false
  });
}

confirm(title: string, text: string, okCallback: () => any) {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
  }).then((result) => {
    if (result.value) {
      okCallback();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
    }
  });
}
confirmCssTwoButton(title: string, text: string) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success ml-3',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  const abt = swalWithBootstrapButtons
    .fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Thoát!',
      reverseButtons: true,
    })
    .then((result) => {
      return result.isConfirmed;
    });
  return abt;
}

//Mixi

successMin(title: string) {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
  });
  toast.fire({
    icon: 'success',
    title: title,
  });
}

}
