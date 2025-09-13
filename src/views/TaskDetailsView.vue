<script setup>
import { useTasksStore } from '@/stores/tasks'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()

const tasksStore = useTasksStore()
const task = tasksStore.tasks.find((item) => item.id === parseInt(props.id))
if (!task) {
  router.replace('/404')
}

const deleteTask = () => {
  tasksStore.deleteTask(task.id)
  router.push('/tasks')
}
</script>

<template>
  <div v-if="task">
    <div>
      <h1>Задача {{ task.title }}</h1>
      <p>Детали задачи #{{ task.description }}</p>
      <button class="btn btn--edit">Редактировать</button>
      &nbsp;
      <button @click="deleteTask" class="btn btn--delete">Удалить</button>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn--edit {
  background-color: #007bff;
  color: white;
}

.btn--edit:hover {
  background-color: #0056b3;
}

.btn--delete {
  background-color: #dc3545;
  color: white;
}

.btn--delete:hover {
  background-color: #c82333;
}

.btn--save {
  background-color: #28a745;
  color: white;
}

.btn--save:hover {
  background-color: #218838;
}
</style>
