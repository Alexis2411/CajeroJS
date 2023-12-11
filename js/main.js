var cuentas = [
    { id: 0, nombre: 'Mali', pass: 'pass', saldo: 200, },
    { id: 1, nombre: 'Gera', pass: 'pass', saldo: 290 },
    { id: 2, nombre: 'Maui', pass: 'pass', saldo: 67 }
];
const max = 990;
const min = 10;
var active = false;

function iniciarSesion() {
    var username = document.getElementById('username').value;
    let password = document.getElementById('pass').value;
    console.log('Nombre de usuario:', username);
    console.log('Contraseña:', password);

    let access = false;
    for (const cuenta of cuentas) {
        if (cuenta.nombre === username && cuenta.pass === password) {
            access = true;
            localStorage.setItem("id", cuenta.id)
            break;
        }
    }
    if (access) {
        window.location.href = 'dashboard.html';
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}

function depositar() {
    let monto = parseInt(document.getElementById("deposito").value);
    let saldo = buscar();

    if (monto > 0) {
        if (monto + saldo > 990) {
            alert("No puedes ingresar más de $990 a la vez.");
        } else {
            alert("Agregaste a tu cuenta: " + monto);
            modificar(monto, "+");
        }
    }
}
function retirar() {
    let monto = parseInt(document.getElementById("retiro").value);
    let saldo = buscar();

    if (monto > 0) {
        if (saldo-monto < 10) {
            alert("No puedes tener menos de $10");
        } else {
            alert("Retiraste de tu cuenta: "+ monto);
            modificar(monto, "-");
        }
    }
}

function consultar() {
    if (!active) {
        active = true;
        return document.getElementById('saldo').placeholder = buscar();
    } else {
        active = false;
        return document.getElementById('saldo').placeholder = "**************"
    }
}

function buscar() {
    for (const cuenta of cuentas) {
        if (cuenta.id === parseInt(localStorage.getItem("id"))) {
            return cuenta.saldo;
            break;
        }
    }
}

function modificar(monto, operacion) {
    for (const cuenta of cuentas) {
        if (cuenta.id === parseInt(localStorage.getItem("id"))) {
            if (operacion == "+") {
                cuenta.saldo += monto;
                break;
            } else if (operacion == "-") {
                cuenta.saldo -= monto;
                break;
            }
        }
    }
}