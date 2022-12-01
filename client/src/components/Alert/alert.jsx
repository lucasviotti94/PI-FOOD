import Swal from 'sweetalert2'

const alert = Swal.fire({
    title: "Recipe not found !",
    text: "There is no recipe with that name",
    icon: "error",
    footer: "Try another name :) ",
    width: "25%"
});

export default alert;