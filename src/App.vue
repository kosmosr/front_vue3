<script setup>
import AddUser from "./components/AddUser.vue";
import {onMounted, ref} from "vue";
import {addUserRequest, editUserRequest, getUserList} from "./api/index.js";

const showModal = ref(false)
const pages = ref(5)
const currentPage = ref(1)
const currentUser = ref({})
const userList = ref([])

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchUerList()
  }
}

const goToNextPage = () => {
  if (currentPage.value < pages.value) {
    currentPage.value++
    fetchUerList()
  }
}

const fetchUerList = () => {
  getUserList(currentPage.value, 1).then(res => {
    console.log(res)
    pages.value = res.pages
    userList.value = res.data
  })
}

const confirm = (user) => {
  console.log(user)
  if (user.uid) {
    // edit
    editUserRequest(user).then(res => {
      if (res.code === 200) {
        alert('success')
        showModal.value = false
        fetchUerList()
      } else {
        alert(res.message)
      }
    })
  } else {
    // add
    addUserRequest(user).then(res => {
      if (res.code === 200) {
        alert('success')
        showModal.value = false
        fetchUerList()
      } else {
        alert(res.message)
      }
    })
  }
}

const addUer = () => {
  currentUser.value = {}
  showModal.value = true
}

const editUser = (user) => {
  currentUser.value = {...user}
  showModal.value = true
}

onMounted(() => {
  fetchUerList()
})
</script>

<template>
  <div class="container mx-auto py-10">
    <div class="border shadow">
      <div class="h-full flex flex-col space-y-8 p-5">
        <div class="flex items-center">
          <button class="shadow-sm px-3 text-xs h-8 border hover:bg-gray-100" @click="addUer">Add user
          </button>
        </div>
        <div class="border rounded-md">
          <table class="w-full text-sm">
            <thead>
            <tr>
              <th class="h-10 px-2 text-left font-medium text-gray-600">id</th>
              <th class="h-10 px-2 text-left font-medium text-gray-600">name</th>
              <th class="h-10 px-2 text-left font-medium text-gray-600">gender</th>
              <th class="h-10 px-2 text-left font-medium text-gray-600">edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in userList" :key="user.uid">
              <td class="h-10 p-2 text-left">{{ user.uid }}</td>
              <td class="h-10 p-2 text-left">{{ user.name }}</td>
              <td class="h-10 p-2 text-left">{{ user.gender }}</td>
              <td class="h-10 p-2 text-left">
                <button class="shadow-sm px-3 text-xs h-8 border hover:bg-gray-100" @click="editUser(user)">edit
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex items-center px-2 space-x-2">
          <button
              class="border h-8 px-3 shadow-sm items-center justify-center enabled:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="currentPage === 1" @click="goToPreviousPage"><
          </button>
          <div v-for="page in pages" :key="page">
            <span class="flex px-3 text-xs h-8 justify-center items-center text-center"
                  :class="page === currentPage ? 'font-bold' : 'font-medium'">{{ page }}</span>
          </div>
          <button
              class="border h-8 px-3 shadow-sm items-center justify-center enabled:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="currentPage === pages" @click="goToNextPage">
            >
          </button>
        </div>
      </div>
    </div>
    <AddUser v-if="showModal" :is-visible="showModal" @close="showModal = false" @confirm="confirm"
             :user="currentUser"/>
  </div>
</template>

<style scoped>
</style>
