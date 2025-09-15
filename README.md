# pfm-transactions
Transactions service for PFM project
# README.md

```markdown
# Transactions Service

Microservicio para la gestión de transacciones financieras con analíticas integradas. Este servicio forma parte de una arquitectura de microservicios y maneja todas las operaciones relacionadas con ingresos, gastos y reportes financieros.

## Características

- **Gestión de Transacciones**: CRUD completo para transacciones financieras (ingresos y gastos)
- **Filtrado Avanzado**: Búsqueda por fechas, tipo de transacción y categorías
- **Analíticas en Tiempo Real**: Resúmenes de ingresos, gastos y balance
- **Generación de Reportes**: Exportación de datos en formato CSV
- **Autenticación JWT**: Validación de tokens para proteger todos los endpoints
- **Validación de Datos**: Esquemas de validación con Zod
- **Base de Datos PostgreSQL**: Persistencia confiable con Prisma ORM

## Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm (v7 o superior)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/your-org/transactions-service.git
cd transactions-service
```

2. Instalar dependencias:
```bash
npm install
```

## Configuración

1. Crear la base de datos en PostgreSQL:
```bash
createdb transactions_db
```

2. Crear archivo `.env` basándose en `.env.example`:
```bash
cp .env.example .env
```

3. Configurar las variables de entorno en `.env`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/transactions_db?schema=public"
PORT=3002
JWT_ACCESS_SECRET=tu-clave-secreta-jwt-aqui
```

**⚠️ IMPORTANTE**: La variable `JWT_ACCESS_SECRET` debe ser exactamente la misma que se usa en el `auth-user-service` para que la validación de tokens funcione correctamente.

4. Generar el cliente de Prisma:
```bash
npm run prisma:generate
```

5. Ejecutar las migraciones de base de datos:
```bash
npm run prisma:migrate
```

## Ejecutar el Proyecto

Modo desarrollo:
```bash
npm run dev
```

Compilar para producción:
```bash
npm run build
```

Ejecutar en producción:
```bash
npm start
```

## Endpoints Disponibles

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/health` | Verificar estado del servicio | No |
| POST | `/api/transactions` | Crear nueva transacción | Sí |
| GET | `/api/transactions` | Listar transacciones del usuario | Sí |
| GET | `/api/transactions/:id` | Obtener transacción específica | Sí |
| PUT | `/api/transactions/:id` | Actualizar transacción | Sí |
| DELETE | `/api/transactions/:id` | Eliminar transacción | Sí |
| GET | `/api/analytics/summary` | Obtener resumen analítico | Sí |
| POST | `/api/reports/csv` | Generar reporte CSV | Sí |

### Ejemplos de Uso

#### Crear una transacción:
```bash
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "EXPENSE",
  "amount": 150.50,
  "description": "Compra en supermercado",
  "category": "Alimentación",
  "date": "2025-01-15T10:00:00Z"
}
```

#### Filtrar transacciones:
```bash
GET /api/transactions?startDate=2025-01-01&endDate=2025-01-31&type=EXPENSE
Authorization: Bearer <token>
```

#### Obtener resumen analítico:
```bash
GET /api/analytics/summary
Authorization: Bearer <token>

Response:
{
  "totalIncome": 3000.00,
  "totalExpense": 1250.50,
  "balance": 1749.50,
  "expensesByCategory": {
    "Alimentación": 450.00,
    "Transporte": 300.50,
    "Servicios": 500.00
  }
}
```

## Estructura del Proyecto

```
src/
├── routes/          # Definición de rutas
├── controllers/     # Lógica de controladores
├── services/        # Lógica de negocio
├── middleware/      # Middleware personalizado
├── utils/           # Utilidades y helpers
├── types/           # Definiciones de TypeScript
└── index.ts         # Punto de entrada de la aplicación
```

## Scripts Disponibles

- `npm run dev` - Ejecuta el servicio en modo desarrollo con hot-reload
- `npm run build` - Compila el código TypeScript a JavaScript
- `npm start` - Ejecuta el servicio compilado
- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:migrate` - Ejecuta las migraciones de base de datos
- `npm run prisma:studio` - Abre Prisma Studio para explorar la base de datos
- `npm run prisma:seed` - Ejecuta el seed de la base de datos (si está configurado)

## Seguridad

- Todos los endpoints (excepto `/health`) requieren autenticación mediante JWT
- Los tokens deben enviarse en el header `Authorization: Bearer <token>`
- Las transacciones están aisladas por usuario (cada usuario solo ve sus propias transacciones)
- Validación estricta de datos de entrada con Zod

## Tecnologías Utilizadas

- **TypeScript** - Lenguaje de programación tipado
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - ORM moderno para TypeScript
- **JWT** - Autenticación basada en tokens
- **Zod** - Validación de esquemas
- **csv-writer** - Generación de archivos CSV

## Contribuir

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request