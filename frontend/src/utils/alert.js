import Swal from "sweetalert2";

export const popAlert = (title, text, icon, confirmButtonText) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#00b5ad",
  });
};
