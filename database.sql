DROP DATABASE IF EXISTS bodega;
CREATE DATABASE bodega;
USE bodega;

CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE vino (
    id_vino INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    marca VARCHAR(100),
    precio_minorista DECIMAL(10,2) NOT NULL,
    precio_mayorista DECIMAL(10,2),
    stock INT NOT NULL,
    tipo_uva VARCHAR(100),
    tipo_vino VARCHAR(100),
    ano_cosecha INT,
    tamano_ml INT,
    es_oferta BOOLEAN DEFAULT FALSE,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20),
    telefono VARCHAR(50),
    direccion VARCHAR(255),
    tipo_cliente VARCHAR(50)
);

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    direccion VARCHAR(255)
);

CREATE TABLE metodo_pago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'pendiente',
    total DECIMAL(10,2) DEFAULT 0,
    direccion_envio VARCHAR(255),
    zona_envio VARCHAR(100),
    costo_envio DECIMAL(10,2) DEFAULT 0,
    tiempo_estimado VARCHAR(100),
    id_metodo_pago INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago)
);

CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_vino INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_vino) REFERENCES vino(id_vino)
);

CREATE TABLE faq (
    id_faq INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuesta TEXT NOT NULL,
    categoria VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

INSERT INTO categoria (nombre, descripcion)
VALUES
('Tinto', 'Vinos tintos'),
('Blanco', 'Vinos blancos'),
('Rosado', 'Vinos rosados'),
('Espumante', 'Vinos espumantes');

INSERT INTO metodo_pago (nombre, descripcion)
VALUES
('Efectivo', 'Pago en efectivo al recibir el pedido'),
('Mercado Pago', 'Pago mediante Mercado Pago'),
('Tarjeta', 'Pago con tarjeta de debito o credito');

INSERT INTO cliente (nombre, apellido, dni, telefono, direccion, tipo_cliente)
VALUES
('Brandon', 'Suarez', '12345678', '1122334455', 'Palermo, CABA', 'minorista');

INSERT INTO usuario (nombre, apellido, email, password, telefono, direccion)
VALUES
('Brandon', 'Suarez', 'brandon@gmail.com', '1234', '1122334455', 'Palermo, CABA');

INSERT INTO vino
(nombre, marca, precio_minorista, precio_mayorista, stock, tipo_uva, tipo_vino, ano_cosecha, tamano_ml, es_oferta, id_categoria)
VALUES
('Malbec Reserva', 'Catena', 12000, 10000, 50, 'Malbec', 'Tinto', 2022, 750, FALSE, 1),
('Chardonnay Premium', 'Norton', 9500, 8000, 30, 'Chardonnay', 'Blanco', 2023, 750, FALSE, 2),
('Cabernet Sauvignon', 'Trapiche', 8500, 7000, 40, 'Cabernet Sauvignon', 'Tinto', 2021, 750, TRUE, 1),
('Rosado Dulce', 'Santa Julia', 7000, 6000, 25, 'Malbec Rosado', 'Rosado', 2023, 750, FALSE, 3),
('Extra Brut', 'Chandon', 15000, 13000, 20, 'Chardonnay Pinot Noir', 'Espumante', 2022, 750, FALSE, 4);

INSERT INTO faq (pregunta, respuesta, categoria)
VALUES
('Hacen envios', 'Si, realizamos envios a todo el pais. En CABA y GBA el tiempo estimado es de 24 hs.', 'envios'),
('Cuanto tarda el envio', 'En CABA y GBA el envio suele demorar aproximadamente 24 hs. Para otras zonas del pais, el tiempo se coordina segun la ubicacion.', 'envios'),
('Que metodos de pago aceptan', 'Aceptamos efectivo, Mercado Pago y tarjeta de debito o credito.', 'pagos'),
('Como puedo comprar', 'Para comprar tenes que registrarte, iniciar sesion, elegir vinos del catalogo, agregarlos al carrito y confirmar el pedido.', 'app'),
('Que funciones tiene la app', 'La app permite registrarse, iniciar sesion, ver el catalogo de vinos, consultar precios y stock, agregar productos al carrito, elegir metodo de pago y generar pedidos.', 'app'),
('Como contacto a la bodega', 'Podes comunicarte con la bodega por WhatsApp al 11-1234-5678 o por email a contacto@bodegafralexis.com.', 'contacto'),
('Tienen vinos tintos', 'Si, contamos con vinos tintos como Malbec Reserva y Cabernet Sauvignon.', 'productos'),
('Tienen vinos blancos', 'Si, contamos con vinos blancos como Chardonnay Premium.', 'productos'),
('Tienen espumantes', 'Si, contamos con espumantes como Extra Brut.', 'productos');