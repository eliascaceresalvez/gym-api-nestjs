# 🏋️ Gym API - NestJS

API REST desarrollada con NestJS para gestionar ejercicios de gimnasio.

## 🚀 Tecnologías

* Node.js
* NestJS
* TypeScript
* Class Validator

## 📦 Funcionalidades

* Crear ejercicios (POST)
* Obtener lista de ejercicios (GET)
* Actualizar ejercicios (PATCH)
* Eliminar ejercicios (DELETE)
* Validación de datos

## 📡 Endpoints

### Crear ejercicio

POST /exercises

### Obtener ejercicios

GET /exercises

### Actualizar ejercicio

PATCH /exercises/:id

### Eliminar ejercicio

DELETE /exercises/:id

## 🧪 Ejemplo de request

```json
{
  "name": "Press banca",
  "weight": 80,
  "reps": 10,
  "date": "2026-03-26T00:00:00.000Z"
}
```

## ▶️ Cómo ejecutar el proyecto

```bash
npm install
npm run start:dev
```

## 📌 Estado del proyecto

En desarrollo — próximamente integración con base de datos.

## 👨‍💻 Autor

Elias Cáceres
