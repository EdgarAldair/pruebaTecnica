<template>
  <div class="test-container">
    <h2>👤 Sistema de Gestión de Usuarios v2</h2>

    <div class="form shadow">
      <input v-model="form.firstName" placeholder="Nombre" />
      <input v-model="form.lastName" placeholder="Apellido" />
      <input v-model="form.idNumber" placeholder="Identificación (ID)" />
      <input v-model="form.birthDate" type="date" />

      <div class="form-buttons">
        <button v-if="!isEditing" class="btn-primary" @click="saveUser">
          Guardar Nuevo
        </button>
        <button v-else class="btn-warning" @click="updateUser">
          Actualizar Datos
        </button>
        <button v-if="isEditing" @click="cancelEdit">Cancelar</button>
      </div>
    </div>

    <hr />

    <div class="header-list">
      <h3>Lista de Usuarios</h3>
      <button class="btn-refresh" @click="loadUsers">
        🔄 Actualizar Lista
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID Number</th>
          <th>Nombre Completo</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in processedUsers" :key="user._id">
          <td>{{ user.idNumber }}</td>
          <td>{{ formatFullName(user) }}</td>
          <td>{{ calculateAge(user.birthDate) }}</td>
          <td class="action-cell">
            <button class="btn-edit" @click="editUser(user)">✏️ Editar</button>
            <button class="btn-danger" @click="removeUser(user._id,user.firstName,user.lastName)">
              🗑️ Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="actions">
      <button class="btn-process" @click="processData">
        📊 Ordenar por ID
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5001/api/users";
const users = ref([]);
const processedUsers = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const form = ref({ firstName: "", lastName: "", idNumber: "", birthDate: "" });

const loadUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    users.value = res.data;
    processedUsers.value = [...users.value];
  } catch (err) {
    console.error("Error al conectar con el servidor:", err && err.message ? err.message : err);
    // Mostrar al usuario un aviso claro
    alert('Error al conectar con el servidor. Asegúrate de que el backend está en ejecución (puerto 5001).');
  }
};

const saveUser = async () => {
  try {
    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      idNumber: form.value.idNumber,
      birthDate: form.value.birthDate,
    };
    const res = await axios.post(API_URL, payload);
    users.value.push(res.data);
    form.value = { firstName: "", lastName: "", idNumber: "", birthDate: "" };
    loadUsers();
  } catch (err) {
    alert("ERROR: El servidor rechazó los datos. Revisa el mapeo de campos.");
 loadUsers();
  }
};

const removeUser = async (id,firstName,lastName) => {
  alert("Se ha eliminado el usuario: " + firstName+" "+lastName);
  await axios.delete(`${API_URL}/${id}`);
  users.value = user.value.filter(u => u.id !== id);
  loadUsers();
};

const editUser = (user) => {
  var date = new Date(user.birthDate);
    form.value.firstName = user.firstName,
    form.value.lastName= user.lastName,
    form.value.idNumber= user.idNumber,
    form.value.birthDate= user.birthDate.date,
  console.log("Cargar usuario en formulario:", user);

};

const updateUser = async () => {
  alert("Pendiente implementar actualización.");
};

const cancelEdit = () => {
  isEditing.value = false;
  form.value = { firstName: "", lastName: "", idNumber: "", birthDate: "" };
};

const processData = () => {
  processedUsers.value.sort((a, b) => a.idNumber - b.idNumber);
};

const formatFullName = (user) => {
  return user.firstName+" "+user.lastName;
};

const calculateAge = (birthDate) => {
  var fechaActual = new Date();
  var cumpleaños= new Date(birthDate);
  var calcularEdad= fechaActual.getFullYear()-cumpleaños.getFullYear();
  return calcularEdad;
};

onMounted(loadUsers);
</script>

<style>
.test-container {
  max-width: 900px;
  margin: 30px auto;
  font-family: "Segoe UI", sans-serif;
  color: #333;
}
.shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
}
.form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 30px;
  background: #fff;
}
.form-buttons {
  grid-column: span 2;
  display: flex;
  gap: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
th,
td {
  border-bottom: 1px solid #eee;
  padding: 12px 15px;
  text-align: left;
}
th {
  background-color: #f8f9fa;
  color: #666;
  text-transform: uppercase;
  font-size: 12px;
}
.action-cell {
  display: flex;
  gap: 8px;
}
.header-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
button {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}
.btn-primary {
  background: #4a90e2;
  color: white;
}
.btn-danger {
  background: #ff4757;
  color: white;
}
.btn-edit {
  background: #ffa502;
  color: white;
}
.btn-warning {
  background: #eccc68;
  color: #333;
}
.btn-refresh {
  background: #2f3542;
  color: white;
}
.btn-process {
  background: #2ed573;
  color: white;
  margin-top: 20px;
  width: 100%;
  font-size: 16px;
}
button:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}
</style>
