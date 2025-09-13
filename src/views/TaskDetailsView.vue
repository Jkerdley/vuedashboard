<script setup>
import { useTasksStore } from '@/stores/tasks'
import { ref } from 'vue'
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

const newTitle = ref(task.title)
const newDescription = ref(task.description)

const deleteTask = () => {
  tasksStore.deleteTask(task.id)
  router.push('/tasks')
}

const isEditing = ref(false)
const saveTask = () => {
  if (newTitle.value && newDescription.value) {
    tasksStore.updateValue(task.id, newTitle.value, newDescription.value)
    isEditing.value = false
  }
}
</script>

<template>
  <div v-if="task">
    <form v-if="isEditing" @submit.prevent="saveTask">
      <input v-model="newTitle" type="text" name="title" class="form-control" />
      <textarea
        v-model="newDescription"
        name="description"
        id="description"
        class="form-control"
      ></textarea>
      <button @click="isEditing = false" class="btn btn--edit" type="button">Отмена</button>
      &nbsp;
      <button class="btn btn--edit" type="submit">Сохранить</button>
    </form>
    <div v-else>
      <h1>Задача {{ task.title }}</h1>
      <p>Детали задачи #{{ task.description }}</p>
      <button @click="isEditing = true" class="btn btn--edit">Редактировать</button>
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
