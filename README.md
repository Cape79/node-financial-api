# Node Financial API

API REST construida con Node.js y Express simulando un dominio financiero.

Este proyecto forma parte de mi transición profesional desde GeneXus hacia
desarrollo backend moderno con Node.js y AWS.

## Funcionalidades

- Crear cuentas
- Listar cuentas
- Obtener cuenta por ID
- Registrar transacciones (crédito / débito)
- Validación de fondos
- Transacciones ACID con PostgreSQL
- Listar extracto de movimientos por cuenta


## Stack

- Node.js
- Express
- JavaScript ES6
- Git / GitHub
- PostgreSQL
- Prisma ORM


## 📦 Dependencias del proyecto

### 🔹 Backend base

* **express** → Framework web para crear el servidor HTTP y manejar rutas

  ```bash
  npm install express
  ```

* **nodemon** → Reinicia automáticamente el servidor en desarrollo

  ```bash
  npm install --save-dev nodemon
  ```

---

### 🔹 Base de datos

* **prisma** → ORM para interactuar con PostgreSQL

  ```bash
  npm install prisma --save-dev
  npm install @prisma/client
  ```

* **pg** → Cliente de PostgreSQL usado por Prisma

  ```bash
  npm install pg
  ```

* **@prisma/adapter-pg** → Adapter necesario en Prisma 7 para conectar con PostgreSQL

  ```bash
  npm install @prisma/adapter-pg
  ```

---

### 🔹 Autenticación

* **jsonwebtoken** → Generación y validación de tokens JWT

  ```bash
  npm install jsonwebtoken
  ```

* **bcrypt** → Hash de contraseñas

  ```bash
  npm install bcrypt
  ```

---

### 🔹 Configuración

* **dotenv** → Carga variables de entorno desde `.env`

  ```bash
  npm install dotenv
  ```

* **dotenv-cli** → Permite usar `.env` en comandos CLI (ej: Prisma)

  ```bash
  npm install dotenv-cli
  ```

---

### 🔹 Logs

* **pino** → Logger estructurado en formato JSON

  ```bash
  npm install pino
  ```

---

### 🔹 Producción

* **pm2** → Gestor de procesos para mantener la app corriendo en producción

  ```bash
  npm install -g pm2
  ```

---

## 🧠 Stack del proyecto

Node.js + Express + Prisma + PostgreSQL (RDS) + JWT + Pino + PM2 + Nginx

---

## 🚀 Notas

* Prisma 7 utiliza `prisma.config.ts` para la configuración de conexión a la base de datos
* En producción se utiliza PM2 para mantener la app activa
* Los logs se envían a CloudWatch mediante el agente de AWS
