const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/proxy/api", async (req, res) => {
  try {
    const targetPath = req.originalUrl.replace("/proxy", "");
    const targetUrl = `http://localhost:8080${targetPath}`;
    console.log(`🔁 Proxying ${req.method} -> ${targetUrl}`);

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: "localhost:8080",
      },
      body:
        ["GET", "HEAD"].includes(req.method.toUpperCase()) ||
        !req.body ||
        Object.keys(req.body).length === 0
          ? undefined
          : JSON.stringify(req.body),
    });

    // Copia cookies se houver
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    // Copia os demais headers
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "set-cookie") {
        res.setHeader(key, value);
      }
    });

    // Trata o tipo de retorno
    const contentType = response.headers.get("content-type");
    const raw = await response.text();

    let responseData;
    try {
      responseData =
        contentType?.includes("application/json") && raw
          ? JSON.parse(raw)
          : raw;
    } catch (err) {
      console.error("Erro ao fazer parse do JSON:", raw);
      responseData = raw;
    }

    res.status(response.status).send(responseData);
  } catch (error) {
    console.error("❌ Erro no proxy:", error);
    res.status(500).json({ error: "Erro no proxy", details: error.message });
  }
});

app.listen(4000, () => {
  console.log("✅ Proxy rodando em http://localhost:4000");
});



// Para rodar o Proxy: 
//  navegue até o diretório do proxy e execute:
//  -> npx nodemon proxy-server.js