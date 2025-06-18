## 🌀 Proxy Server com Express

Este projeto implementa um **servidor proxy** em Node.js usando  **Express** . Ele permite que você intermedie chamadas entre seu front-end (por exemplo, rodando em `http://localhost:3000`) e seu back-end (por exemplo, em `http://localhost:8078`), **evitando problemas de CORS** e permitindo o uso de **cookies HTTP-only** para autenticação.

### 📌 Para que serve este proxy?

Este proxy resolve problemas típicos de desenvolvimento com front-end e back-end em domínios/portas diferentes:

* ✅ **Evita erros de CORS** sem precisar mexer na configuração do backend
* ✅ **Encaminha headers e cookies** corretamente
* ✅ Permite uso de **autenticação com cookies HTTP-only**
* ✅ Útil para **testes e integração local**

## 🚀 Como usar

### 1. Instale as dependências

Acesse a pasta do proxy:
``cd proxy-server``

Instale o Express, CORS e node-fetch:
``npm install express cors node-fetch``

Se desejar usar com `nodemon` para recarregar automaticamente:
``npm install --save-dev nodemon``

### 2. Estrutura de arquivos

proxy-server/
├── node_modules/
├── proxy-server.js       <-- Arquivo principal do proxy
├── package.json
└── .gitignore

### 3. Inicie o proxy

Com `nodemon` (recomendado para desenvolvimento):

``npx nodemon proxy-server.js``

Ou com Node.js puro:

``node proxy-server.js``

O proxy estará disponível em: `http://localhost:4000`

## 🔄 Como funciona o proxy?

### Requisições da sua aplicação front-end (React, Next.js, etc) para:

``http://localhost:4000/proxy/api/sua-rota``

São encaminhadas automaticamente para:

``http://localhost:8078/api/sua-rota``

## 🧪 Exemplo de uso

### Chamada do front-end:

```//
fetch("http://localhost:4000/proxy/api/login", {   
    method: "POST",   
    credentials: "include", // IMPORTANTE para enviar cookies   
    headers: {   
        "Content-Type": "application/json",
        },   
        body: JSON.stringify({   
            email: "admin@email.com",
            password: "123456",
            }),
        });
```

O proxy receberá essa chamada e a redirecionará para:

``http://localhost:8078/api/login``

## 📁 Redirecionando outras rotas

Você pode chamar **qualquer rota da API original** da seguinte forma:

| Front-end chama                                    | Proxy redireciona para                       |
| -------------------------------------------------- | -------------------------------------------- |
| `http://localhost:4000/proxy/api/login`          | `http://localhost:8078/api/login`          |
| `http://localhost:4000/proxy/api/users`          | `http://localhost:8078/api/users`          |
| `http://localhost:4000/proxy/api/atividades/123` | `http://localhost:8078/api/atividades/123` |
| `http://localhost:4000/proxy/api/logout`         | `http://localhost:8078/api/logout`         |

Basta trocar o prefixo `/proxy` no front-end por nada no back-end.

## 🔐 Suporte a Cookies

* Os **cookies setados pelo back-end** são repassados corretamente pelo proxy (ex: `Set-Cookie`)
* O proxy também **permite que o front-end envie os cookies** com `credentials: "include"`

## 🛠️ Dicas de Desenvolvimento

* Adicione um `.gitignore` com:
* 

```
/node_modules/
/proxy-server/node_modules/
```

Para produção, considere soluções mais robustas como Nginx, API Gateway ou Vite Proxy para front-end.


## ✅ Requisitos

* Node.js 18+
* NPM
