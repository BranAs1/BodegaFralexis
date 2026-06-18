import express from "express";

import vinoRoutes from "./routes/vinoRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import pedidoRoutes from "./routes/PedidoRoutes.js";
import detallePedidoRoutes from "./routes/DetallePedidoRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Bodega Fralexis funcionando"
  });
});

// Rutas
app.use("/api/vinos", vinoRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/detalle-pedido", detallePedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Bodega Fralexis corriendo en puerto ${PORT}`);
});