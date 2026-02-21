# Prueba Técnica: Fullstack Junior (V2 - Debugging & CRUD)

## Escenario
Te entrego un sistema de gestión de usuarios que ya está conectado a una base de datos en la nube (MongoDB Atlas). Sin embargo, el desarrollador anterior dejó varias funciones incompletas, algunos botones no funcionan y hay un error que impide registrar nuevos usuarios.

---

## Instrucciones de Inicio (Git)
Antes de comenzar a programar, debes seguir estos pasos obligatorios para configurar tu entorno de trabajo:

1.  Clonar el repositorio.
2.  Cambiarse de rama a una nueva con tu nombre.
3.  Corregir el Commit Inicial:
    El último commit del repositorio tiene una falta de ortografía: "Prueba téncia". Debes investigar cómo corregir el mensaje del último commit (usando el comando amend) para que el mensaje sea: "Prueba técnica" (con tilde y sin el error).
4.  Hacer Push Force:
    Una vez corregido el mensaje, debes subir tus cambios a tu rama forzando la actualización del historial. Investiga cómo realizar un push force de manera correcta hacia tu rama remota.

---

## Configuración y Ejecución

### Backend
1. Entra a la carpeta backend: `cd backend`
2. Crea tu archivo `.env` basándote en el `.env.example` (Yo te daré la URI de Mongo).
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor:
   ```bash
   npm start
   ```
   *Deberías ver el mensaje: "Conectado a MongoDB Atlas" y "Servidor en puerto 5001".*

### Frontend
1. Entra a la carpeta frontend: `cd frontend`
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## Objetivos de la Prueba

### 1. Debugging (Corrección de Errores)
*   ¿Pudiste arreglar el registro? El botón "Guardar Nuevo" siempre devuelve un error del servidor. Encuentra por qué el backend rechaza los datos y corrige el envío en el frontend.
*   ¿Lograste que el botón de borrado funcione? El botón rojo tiene el diseño listo pero no tiene lógica. Debes implementar la llamada a la API (DELETE) para que elimine el usuario de la base de datos y de la vista.

### 2. Lógica de Procesamiento (JS/Vue)
En el archivo App.vue encontrarás funciones marcadas como PENDIENTE que debes completar:
*   Nombre Completo: ¿Sabes cómo concatenar firstName y lastName?
*   Cálculo de Edad: Calcula la edad real basándose en la fecha de nacimiento (birthDate) comparada con la fecha actual.
*   Ordenamiento: Al presionar "Ordenar por ID", haz que la lista se organice de forma ascendente según el número de identificación.

### 3. Funcionalidad Extra: Edición (Update)
*   Implementa la lógica del botón Editar:
    1. Al hacer clic, los datos del usuario deben cargarse en el formulario superior.
    2. El botón de "Guardar" debe cambiar a "Actualizar Datos".
    3. Al finalizar, envía una petición PUT al servidor para guardar los cambios.

---

## Entrega de la prueba
Cuando hayas terminado todos los puntos anteriores:
1.  Haz un commit con tus avances usando el comando `git commit`.
2.  Sube los cambios finales a tu rama en el repositorio remoto.

---

## Criterios de Evaluación
*   ¿Corregiste el commit con amend?
*   ¿Pudiste encontrar el error en la petición de guardado?
*   ¿Manejas correctamente Axios (GET, POST, PUT, DELETE)?
*   ¿Tu lógica de JavaScript es sólida (sort, fechas)?
*   ¿Tu código es legible y sin comentarios basura?
