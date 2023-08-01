class Articulo {
    constructor(nombre, precio, categoria, id, detalles, img) {
        this._nombreArticulo = nombre;
        this._precioArticulo = precio;
        this._categoriaArticulo = categoria;
        this._idArticulo = id;
        this._detallesArticulo = detalles;
        this._imgArticulo = img;
    }
}

let carrito = [];

let zapatillaJordan = new Articulo(
    'Zapatilla Air Jordan',
    500,
    'Zapatilla',
    1,
    'Esta es una zapatilla Nike de Air Jordan',
    'img/zapatillas_nike.jpg'
);

let zapatillaAdidas = new Articulo(
    'Zapatilla All start',
    400,
    'Zapatilla',
    2,
    'Esta es una zapatilla Adidas de All start',
    'img/zapatilla_adidas.jpg'
);

let remeraNike = new Articulo(
    'Remera nike',
    200,
    'Remera',
    3,
    'Esta es una remera de nike',
    'img/remera_nike.jpg'
);

let remeraAdidas = new Articulo(
    'Remera Adidas',
    220,
    'Remera',
    4,
    'Esta es una remera de adidas',
    'img/imagenRemeraAdidas.jpg'
);

let buzoNike = new Articulo(
    'Buzo de Nike',
    350,
    'Buzo',
    5,
    'Este es un buzo de nike',
    'img/buzo_nike.jpg'
);

let buzoAdidas = new Articulo(
    'Buzo de adidas',
    320,
    'Buzo',
    6,
    'Este es un buzo de adidas',
    'img/buzoAdidas.jpg'
);

let articulos = [];
articulos.push(remeraNike, zapatillaJordan, zapatillaAdidas, remeraAdidas, buzoAdidas, buzoNike);

function imprimirArticulo(articulo) {
    const divContenedorART = document.getElementById('contenedorArticulos');

    const divContenedor = document.createElement('div');
    divContenedor.classList.add('articulo');
    divContenedorART.appendChild(divContenedor);

    const figureContenedor = document.createElement('figure');
    divContenedor.appendChild(figureContenedor);

    const imagenDelArticulo = document.createElement('img');
    imagenDelArticulo.setAttribute('src', articulo._imgArticulo);
    imagenDelArticulo.setAttribute('width', '300px');
    figureContenedor.appendChild(imagenDelArticulo);

    const nombreDelArticulo = document.createElement('h4');
    nombreDelArticulo.innerText = articulo._nombreArticulo;
    divContenedor.appendChild(nombreDelArticulo);

    const precioDelArticulo = document.createElement('p');
    precioDelArticulo.innerText = `$${articulo._precioArticulo}`;
    divContenedor.appendChild(precioDelArticulo);

    const categoriaDelArticulo = document.createElement('p');
    categoriaDelArticulo.innerText = articulo._categoriaArticulo;
    divContenedor.appendChild(categoriaDelArticulo);

    const divParareemplazardetalles = document.createElement('div');
    divContenedor.appendChild(divParareemplazardetalles);

    const btnDetalles = document.createElement('button');
    btnDetalles.innerText = 'Mas detalles';
    divContenedor.appendChild(btnDetalles);
    btnDetalles.addEventListener('click', function () {
        const parrafoDeDetalles = document.createElement('p');
        parrafoDeDetalles.innerText = articulo._detallesArticulo;
        divParareemplazardetalles.replaceWith(parrafoDeDetalles);

        const btnEliminarDetalles = document.createElement('button');
        btnEliminarDetalles.innerText = 'Menos detalles';
        btnDetalles.replaceWith(btnEliminarDetalles);
        btnEliminarDetalles.addEventListener('click', function () {
            btnEliminarDetalles.replaceWith(btnDetalles);
            parrafoDeDetalles.replaceWith(divParareemplazardetalles);
        });
    });

    const btnAgregarAlCarrito = document.createElement('button');
    btnAgregarAlCarrito.innerText = 'Agregar al carrito';
    divContenedor.appendChild(btnAgregarAlCarrito);
    btnAgregarAlCarrito.addEventListener('click', function () {
        carrito.push(articulo);
        mostrarInfoCarrito();
    });
}

function imprimirArticulos() {
    const divContenedorART = document.getElementById('contenedorArticulos');
    divContenedorART.innerHTML = '';

    articulos.forEach(articulo => {
        imprimirArticulo(articulo);
    });
}

function mostrarInfoCarrito() {
    let totalPrecio = 0;
    let cantidadProductos = carrito.length; 

    carrito.forEach(articulo => {
        totalPrecio += articulo._precioArticulo;
    });

    const mostrarPrecioTotal = document.getElementById('precioTotal');
    mostrarPrecioTotal.innerText = `Precio total = $${totalPrecio}`;

    const productosquehay = document.getElementById('cantidadDeProductos');
    productosquehay.innerText = `Cantidad de productos = ${cantidadProductos}`;
}

function filtrarArticulos(categoria) {
    const divContenedor = document.getElementById('contenedorArticulos');
    divContenedor.innerHTML = ''; 

    articulos.forEach(articulo => {
        if (articulo._categoriaArticulo === categoria || categoria === 'Todas') {
            imprimirArticulo(articulo);
        }
    });
}

function generarBotonesCategorias() {
    const footer = document.getElementById("footer");
    const categorias = articulos.map(articulo => articulo._categoriaArticulo);
    const categoriasUnicas = [...new Set(categorias)];

    const crearBTNFiltroCategorias = document.getElementById('buttonCategorias');
    crearBTNFiltroCategorias.innerHTML = '';

    const botonTodas = document.createElement('button');
    botonTodas.innerText = 'Todas';
    crearBTNFiltroCategorias.appendChild(botonTodas);
    botonTodas.addEventListener('click', function () {
        filtrarArticulos('Todas');
    });

    categoriasUnicas.forEach(categoria => {
        const botonCategorias = document.createElement('button');
        botonCategorias.innerText = categoria;
        crearBTNFiltroCategorias.appendChild(botonCategorias);
        botonCategorias.addEventListener('click', function () {
            filtrarArticulos(categoria);
        });
    });
}

function mostrarCarrito() {
    const divCarrito = document.createElement('div');
    divCarrito.id = 'carrito';

    const h2Carrito = document.createElement('h2');
    h2Carrito.innerText = 'Carrito de compras';
    divCarrito.appendChild(h2Carrito);

    const btnVolverAtras = document.createElement('button');
    btnVolverAtras.innerText = 'Volver atrás';
    btnVolverAtras.addEventListener('click', function () {
        filtrarArticulos('Todas');
    });
    divCarrito.appendChild(btnVolverAtras);

    carrito.forEach((articulo, index) => {
        const divArticulo = document.createElement('div');
        divArticulo.classList.add('articulo-carrito');

        const p = document.createElement('p');
        p.innerText = `${articulo._nombreArticulo} - $${articulo._precioArticulo}`;
        divArticulo.appendChild(p);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'boton';
        btnEliminar.innerText = 'x';
        btnEliminar.addEventListener('click', function () {
            eliminarArticuloDelCarrito(index);
            mostrarCarrito();
        });
        divArticulo.appendChild(btnEliminar);

        divCarrito.appendChild(divArticulo);
    });

    const contenedorArticulos = document.getElementById('contenedorArticulos');
    contenedorArticulos.innerHTML = '';
    contenedorArticulos.appendChild(divCarrito);
}



function crearBotonVerCarrito() {
    const divInfoCarrito = document.getElementById('divInfoCarrito');

    const btnVerCarrito = document.createElement('button');
    btnVerCarrito.innerText = 'Ver carrito';
    btnVerCarrito.addEventListener('click', mostrarCarrito);

    divInfoCarrito.appendChild(btnVerCarrito);
}

function eliminarArticuloDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarInfoCarrito();
}

function crearBotonVaciarCarrito() {
    const divInfoCarrito = document.getElementById('divInfoCarrito');

    const btnVaciarCarrito = document.createElement('button');
    btnVaciarCarrito.innerText = 'Vaciar carrito';
    btnVaciarCarrito.addEventListener('click', function(){
        carrito = []; 
        mostrarCarrito(); 
        mostrarInfoCarrito();
    });

    divInfoCarrito.appendChild(btnVaciarCarrito);
}




imprimirArticulos();
mostrarInfoCarrito();
generarBotonesCategorias();
crearBotonVerCarrito();
crearBotonVaciarCarrito(); 
