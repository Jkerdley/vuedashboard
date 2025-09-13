import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id: 1,
      title: 'Task 1',
      description: 'Описание',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Описание',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Описание',
    },
  ])

  const tasksTotal = computed(() => {
    return tasks.value.length
  })

  const addTask = (title, description) => {
    tasks.value.push({
      id: Date.now(),
      title,
      description,
    })
  }

  const deleteTask = (id) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  }

  const updateValue = (id, title, description) => {
    const task = tasks.value.find((task) => task.id === id)
    if (task) {
      task.title = title
      task.description = description
    }
  }

  return { tasks, tasksTotal, addTask, deleteTask, updateValue }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
