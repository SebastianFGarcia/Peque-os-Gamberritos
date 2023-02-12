class Estudiante {
    constructor(nombre, curso,genero, materia1, materia2, materia3, promedio, aprobado) {
        this.nombre = nombre;
        this.curso = curso;
        this.genero = genero;
        this.materia1 = materia1;
        this.materia2 = materia2;
        this.materia3 = materia3;
        this.promedio = promedio;
        this.aprobado = aprobado;
    }
}


let estudiantes = [];
const tbody = document.getElementById('tbody');
const nombre = document.getElementById('nombre');
const curso = document.getElementById('curso');
const genero = document.getElementById('genero');
const materia1 = document.getElementById('nota1');
const materia2 = document.getElementById('nota2');
const materia3 = document.getElementById('nota3');
const invalidNota1 = document.getElementById('invalidNota1');
const invalidNota2 = document.getElementById('invalidNota2');
const invalidNota3 = document.getElementById('invalidNota3');
const btnAgregar = document.getElementById('btnAgregar');
const myModalCreate = document.getElementById('crearEstudiante')
const myModal = new bootstrap.Modal(myModalCreate);
myModalCreate.addEventListener('shown.bs.modal', () => {
  nombre.focus();
  resetForm();
})
if (localStorage.getItem('estudiantes') === null) {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
} else {
    estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    Mostrar();
}
const myInput = document.getElementById('myInput')
btnAgregar.addEventListener('click', () => {
    let validacion = Validaciones();
    if (!validacion) {
        return;
    } 
    let aprobo;
    let promedio = (parseFloat(materia1.value) + parseFloat(materia2.value) + parseFloat(materia3.value)) / 3;
    if (promedio >= 3.5) {
        aprobo = 'Si';
    } else {
        aprobo = 'No';
    }
    const estudiante = new Estudiante(nombre.value, curso.value, genero.value, materia1.value, materia2.value, materia3.value, promedio, aprobo);
    estudiantes.push(estudiante);
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    Mostrar();
    myModal.hide();
    
});

function Mostrar() {
    estudiantes = JSON.parse(localStorage.getItem('estudiantes'));
    tbody.textContent = '';
    estudiantes.forEach(estudiante => {
        const tr = document.createElement('tr');
        tr.style.backdropFilter = 'blur(20px)';
        const tdNombre = document.createElement('td');
        const tdCurso = document.createElement('td');
        const tdGenero = document.createElement('td');
        const tdMateria1 = document.createElement('td');
        const tdMateria2 = document.createElement('td');
        const tdMateria3 = document.createElement('td');
        const tdPromedio = document.createElement('td');
        const tdAprobado = document.createElement('td');
        tdNombre.textContent = estudiante.nombre;
        tdCurso.textContent = estudiante.curso;
        tdGenero.textContent = estudiante.genero;
        tdMateria1.textContent = estudiante.materia1;
        tdMateria2.textContent = estudiante.materia2;
        tdMateria3.textContent = estudiante.materia3;
        tdPromedio.textContent = estudiante.promedio;
        tdAprobado.textContent = estudiante.aprobado;
        tr.appendChild(tdNombre);
        tr.appendChild(tdCurso);
        tr.appendChild(tdGenero);
        tr.appendChild(tdMateria1);
        tr.appendChild(tdMateria2);
        tr.appendChild(tdMateria3);
        tr.appendChild(tdPromedio);
        tr.appendChild(tdAprobado);
        tbody.appendChild(tr);
    });
}

function resetForm() {
    nombre.value = '';
    curso.value = '';
    genero.value = '';
    materia1.value = '';
    materia2.value = '';
    materia3.value = '';
}


function Validaciones() {
    let validNombre = true;
    let validCurso = true;
    let validGenero = true;
    let validMateria1 = true;
    let validMateria2 = true;
    let validMateria3 = true;
    if (nombre.value === '') {
        nombre.classList.add('is-invalid');
        validNombre = false;
    } else {
        nombre.classList.remove('is-invalid');
    }
    if (curso.value === '') {
        curso.classList.add('is-invalid');
        validCurso = false;
    } else {
        curso.classList.remove('is-invalid');
    }
    if (genero.value === '') {
        genero.classList.add('is-invalid');
        validGenero = false;
    } else {
        genero.classList.remove('is-invalid');
    }
    if (materia1.value === '') {
        materia1.classList.add('is-invalid');
        validMateria1 = false;
        invalidNota1.textContent = 'Debe ingresar una nota';
    } else if(materia1.value < 0 || materia1.value > 5){
        materia1.classList.add('is-invalid');
        validMateria1 = false;
        invalidNota1.textContent = 'La nota debe estar entre 0 y 5';
    } else {
        materia1.classList.remove('is-invalid');
    }
    if (materia2.value === '') {
        materia2.classList.add('is-invalid');
        validMateria2 = false;
        invalidNota2.textContent = 'Debe ingresar una nota';
    } else if(materia2.value < 0 || materia2.value > 5){
        materia2.classList.add('is-invalid');
        validMateria2 = false;
        invalidNota2.textContent = 'La nota debe estar entre 0 y 5';
    } else {
        materia2.classList.remove('is-invalid');
    }
    if (materia3.value === '') {
        materia3.classList.add('is-invalid');
        validMateria3 = false;
        invalidNota3.textContent = 'Debe ingresar una nota';
    } else if(materia3.value < 0 || materia3.value > 5){
        materia3.classList.add('is-invalid');
        validMateria3 = false;
        invalidNota3.textContent = 'La nota debe estar entre 0 y 5';
    } else {
        materia3.classList.remove('is-invalid');
    }
    if (validNombre && validCurso && validGenero && validMateria1 && validMateria2 && validMateria3) {
        return true;
    } else {
        return false;
    }
}


