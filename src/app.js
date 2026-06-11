import express from "express";

import vinoRoutes from "./routes/vinoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import pedidoRoutes from "./routes/PedidoRoutes.js";
import detallePedidoRoutes from "./routes/DetallePedidoRoutes.js";
import metodoPagoRoutes from "./routes/metodoPagoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Bodega Fralexis funcionando"
  });
});

app.use("/api/vinos", vinoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/detalle-pedido", detallePedidoRoutes);
app.use("/api/metodos-pago", metodoPagoRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Bodega Fralexis corriendo en puerto ${PORT}`);
});