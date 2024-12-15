document.addEventListener('DOMContentLoaded', function() {
    // Variables de carrito
    const botonesCompra = document.querySelectorAll('.botoncomprar');
    let contadorCarrito = 0;
    let productosCarrito = [];
    const carritoElemento = document.getElementById('carrito');
    const listaCarrito = document.getElementById('listaCarrito');
	
	const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    productosCarrito = carritoGuardado;
    contadorCarrito = productosCarrito.length;
	carritoElemento.textContent = `Carrito (${contadorCarrito})`;
    actualizarCarrito();

    // Añadir evento a cada botón de compra
    botonesCompra.forEach(function(boton) {
        boton.addEventListener('click', function() {
            const nombreProducto = this.closest('.producto').querySelector('h2').textContent;
            const precioProducto = this.closest('.producto').querySelector('p').textContent;

            // Añadir al carrito
            productosCarrito.push({ nombre: nombreProducto, precio: precioProducto });
            contadorCarrito++;
            carritoElemento.textContent = `Carrito (${contadorCarrito})`;

			 // Guardar el carrito en localStorage
            localStorage.setItem('carrito', JSON.stringify(productosCarrito));


            // Mostrar el producto en el carrito
            actualizarCarrito();

            // Mostrar alerta de producto añadido
            alert(`${nombreProducto} añadido al carrito`);
        });
    });

    // Actualizar la lista del carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        productosCarrito.forEach(function(producto) {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - ${producto.precio}`;
            listaCarrito.appendChild(li);
        });
    }

    // Mostrar la nueva ventana flotante para historial de compras
    function mostrarVentanaHistorial() {
    const ventanaHistorial = document.getElementById('ventana-historial-nueva');
    ventanaHistorial.style.display = 'block';

    // Mostrar los productos en el historial
    const historialLista = document.getElementById('historial-lista');
    historialLista.innerHTML = '';
    let total = 0;
    productosCarrito.forEach(function(producto) {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.precio}`;
        historialLista.appendChild(li);

        // Limpia el formato del precio
        const precioLimpio = producto.precio.replace('S/', '').replace(/,/g, '').trim();
        total += parseFloat(precioLimpio);
    });
    document.getElementById('precio-total').textContent = `Total: S/${total.toFixed(2)}`;
}


    // Función para cerrar la nueva ventana flotante del historial
    function cerrarVentanaHistorial() {
        document.getElementById('ventana-historial-nueva').style.display = 'none';
    }

    // Función para finalizar la compra
    function finalizarCompra() {
        let mensajeCompra = 'Compra finalizada\nArtículos comprados:\n';

        productosCarrito.forEach(function(producto) {
            mensajeCompra += `- ${producto.nombre} (${producto.precio})\n`;
        });

        // Mostrar el diálogo con los productos comprados
        alert(mensajeCompra);

        // Vaciar el carrito
        productosCarrito = [];  
        contadorCarrito = 0;
        carritoElemento.textContent = 'Carrito (${contadorCarrito})';
		listaCarrito.innerHTML = '';
        localStorage.removeItem('carrito');
		
		

        // Cerrar la ventana de historial
        cerrarVentanaHistorial();
    }

    // Función para cancelar la compra
    function cancelarCompra() {
        alert('Compra cancelada');
        cerrarVentanaHistorial();
		
		// Reiniciar el carrito
    productosCarrito = [];
    contadorCarrito = 0;
    carritoElemento.textContent = `Carrito (${contadorCarrito})`;
    listaCarrito.innerHTML = '';

    // Limpiar el carrito de localStorage
    localStorage.removeItem('carrito');

    // Cerrar la ventana de historial
    cerrarVentanaHistorial();
    }

    // Mostrar ventana de historial de compras cuando se haga clic en el carrito
    carritoElemento.addEventListener('click', mostrarVentanaHistorial);

    
    const botonCerrarVentanaHistorial = document.querySelector('.ventana-historial-nueva span');
    if (botonCerrarVentanaHistorial) {
        botonCerrarVentanaHistorial.addEventListener('click', cerrarVentanaHistorial);
    }

    // Añadir funcionalidad al botón "Comprar" en la ventana flotante del historial
    const botonComprarHistorial = document.getElementById('boton-comprar');
    if (botonComprarHistorial) {
        botonComprarHistorial.addEventListener('click', function() {
            // Mostrar alerta de compra solo cuando se finalice la compra
            if (productosCarrito.length > 0) {
                let mensajeCompra = 'Compra finalizada\nArtículos comprados:\n';
                productosCarrito.forEach(function(producto) {
                    mensajeCompra += `${producto.nombre} - ${producto.precio}\n`;
                });
                alert(mensajeCompra);
            } else {
                alert('No hay productos en el carrito para comprar.');
            }
            // Finalizar la compra
            finalizarCompra();
        });
    }

    // Añadir funcionalidad al botón "Cancelar compra" en la ventana flotante del historial
    const botonCancelarCompra = document.getElementById('boton-cancelar-compra');
    if (botonCancelarCompra) {
        botonCancelarCompra.addEventListener('click', cancelarCompra);
    }
});

// Función para mostrar la ventana flotante de información de producto
function mostrarVentana(nombreProducto) {
    const infoProductos = {
       // Productos de ofertas
    "Laptop HP Pavilion 15-eg2522la": "Una laptop potente para tareas diarias con un diseño elegante.",
    "Laptop HP 15-fc0006la R3-7320U": "Ideal para estudiantes y profesionales, combina rendimiento y portabilidad.",
    "Laptop Victus Gaming 15-fb2019la": "Diseñada para gamers, cuenta con gráficos de alta calidad.",
    "Laptop HP OMEN Transcend 14-fb0001la": "Máximo rendimiento para juegos y edición profesional.",

    // Smartphones Samsung
    "Celular Samsung Galaxy A15 8GB RAM 256GB.jpg": "Un smartphone con gran capacidad de almacenamiento y un diseño moderno.",
    "Smartphone Galaxy A35 8Gb 256Gb Awesome Lila": "Un dispositivo potente con colores vibrantes y cámara de alta resolución.",
    "Celular SAMSUNG Galaxy S24 Ultra 5G 256GB 12GB": "El último modelo de Samsung, con tecnología 5G y cámara profesional.",
    "SAMSUNG GALAXY A55 256GB 8GB RAM AWESOME ICEBLUE": "Un teléfono de gama media-alta con diseño elegante y rendimiento sólido.",

    // Smartphones iPhone
    "Celular Apple Iphone 13 128gb": "Un clásico de Apple con excelente rendimiento y cámara de calidad.",
    "Apple iPhone 16 Pro Max Apple Intelligence 256GB (eSIM) - Desert Titanium": "El modelo más avanzado de Apple con innovaciones de última generación.",
    "Apple Iphone 14 128gb": "Un equilibrio perfecto entre diseño, potencia y tecnología.",
    "Iphone 15 128Gb": "La última versión del iPhone con mejoras en batería y rendimiento."
	

	
	
    };

    document.getElementById("ventana-titulo").textContent = nombreProducto;
    document.getElementById("ventana-contenido").textContent = infoProductos[nombreProducto] || "Información no disponible.";
    document.getElementById("ventana-flotante").style.display = "block";
}

// Función para cerrar la ventana flotante de información
function cerrarVentana() {
    document.getElementById("ventana-flotante").style.display = "none";
}

// Función para alternar el menú de navegación
function toggleMenu() {
    const menu = document.querySelector('.menu-navegacion');
    menu.classList.toggle('active');
}
