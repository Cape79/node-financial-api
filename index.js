const config = require("./config");
const app = require("./server");

const port = config.port;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
