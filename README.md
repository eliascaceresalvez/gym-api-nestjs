# 🏋️ Gym API

## 📌 Descripción

API REST para gestión de ejercicios de gimnasio con autenticación JWT y soporte multi-usuario. Permite a cada usuario crear, consultar, actualizar y eliminar sus propios ejercicios de forma segura.

## ✨ Características

- 🔐 Autenticación JWT multi-usuario
- 📊 Gestión completa de ejercicios (CRUD)
- ✅ Validación robusta de datos con class-validator
- 🗄️ Base de datos SQLite con TypeORM
- 🔒 Endpoints protegidos con guards
- 📝 Documentación clara y ejemplos de uso
- 👥 Multi-usuario: cada usuario solo puede acceder a sus propios ejercicios

## 🔑 Autenticación

Esta API utiliza JWT (JSON Web Tokens).  
Después del login, debes incluir el token en el header:

Authorization: Bearer YOUR_TOKEN

## 🚀 Tecnologías

- **Framework**: [NestJS](https://nestjs.com/) - Framework Node.js progresivo
- **Lenguaje**: TypeScript
- **Base de datos**: SQLite con [TypeORM](https://typeorm.io/)
- **Autenticación**: JWT con [Passport](https://www.passportjs.org/)
- **Validación**: [class-validator](https://github.com/typestack/class-validator)
- **Encriptación**: bcrypt para contraseñas
- **Testing**: Jest

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <https://github.com/eliascaceresalvez/gym-api-nestjs.git>
   cd gym-api-nestjs
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` con tus configuraciones (JWT secret, etc.)

4. **Ejecuta las migraciones** (si es necesario)
   ```bash
   npm run start:dev
   ```
   TypeORM creará automáticamente las tablas en SQLite.

## ▶️ Cómo ejecutar

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

### Testing
```bash
npm run test
npm run test:e2e
```

La API estará disponible en `http://localhost:3000`

## 📡 Endpoints Principales

### 🔐 Autenticación

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### 🏋️ Ejercicios

Todos los endpoints de ejercicios requieren autenticación JWT (Bearer token en header `Authorization`).

#### Crear ejercicio
```http
POST /exercises
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Press banca",
  "weight": 80.5,
  "reps": 10,
  "date": "2026-03-26"
}
```

#### Obtener ejercicios del usuario
```http
GET /auth/profile
Authorization: Bearer YOUR_TOKEN
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Press banca",
    "weight": 80.5,
    "reps": 10,
    "date": "2026-03-26",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
]
```

#### Actualizar ejercicio
```http
PATCH /exercises/1
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "weight": 85,
  "reps": 8
}
```

#### Eliminar ejercicio
```http
DELETE /exercises/1
Authorization: Bearer YOUR_TOKEN
```

## 🧪 Ejemplo de uso completo

1. **Registrar usuario** (endpoint POST /users o pre-creado en base de datos)
2. **Login para obtener token**
3. **Crear ejercicio con el token**
4. **Obtener lista de ejercicios**

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# 2. Crear ejercicio (reemplaza YOUR_TOKEN con el token real)
curl -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Sentadillas",
    "weight": 100,
    "reps": 12,
    "date": "2026-03-26"
  }'

# 3. Obtener ejercicios
curl -X GET http://localhost:3000/exercises \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🏗️ Arquitectura

```
src/
├── auth/           # Módulo de autenticación
│   ├── dto/        # DTOs de login
│   ├── guards/     # JwtAuthGuard
│   ├── strategies/ # Passport JWT strategy
│   └── ...
├── exercises/      # Módulo de ejercicios
│   ├── dto/        # DTOs de creación/actualización
│   ├── entities/   # Entidad Exercise
│   └── ...
├── users/          # Módulo de usuarios
├── config/         # Configuración de base de datos
└── app.module.ts   # Módulo raíz
```

## 📝 Notas de desarrollo

- La base de datos SQLite se crea automáticamente en `db.sqlite`
- Los ejercicios están asociados a usuarios (relación ManyToOne)
- Todas las operaciones CRUD de ejercicios requieren autenticación
- Las fechas deben estar en formato ISO 8601

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Elias Cáceres** - [GitHub](https://github.com/eliascaceresalvez)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
