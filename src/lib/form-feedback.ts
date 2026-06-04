import Swal from "sweetalert2";

const BRAND = "#005f71";

export function showFormSuccessAlert(options: {
  title?: string;
  message: string;
  folio?: string | null;
}): Promise<unknown> {
  const title = options.title ?? "¡Solicitud enviada!";
  const html = options.folio
    ? `<p style="margin:0;font-size:1rem;line-height:1.5">${options.message}</p>
       <p style="margin:1rem 0 0;font-size:0.875rem;color:#5c6f75">Folio de referencia</p>
       <p style="margin:0.25rem 0 0;font-size:1.125rem;font-weight:600;color:${BRAND}">${options.folio}</p>`
    : `<p style="margin:0;font-size:1rem;line-height:1.5">${options.message}</p>`;

  return Swal.fire({
    icon: "success",
    title,
    html,
    confirmButtonText: "Entendido",
    confirmButtonColor: BRAND,
    buttonsStyling: true,
  });
}

export function showFormErrorAlert(message: string, title = "No se pudo enviar"): Promise<unknown> {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "Cerrar",
    confirmButtonColor: BRAND,
  });
}
