<script setup>
import {onMounted, reactive, watch} from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object,
    default: {}
  }
})

const name = ''
const gender = ''

const formUser = reactive({
  uid: '',
  name: '',
  gender: ''
})

watch(
    () => props.user,
    (newUser) => {
      formUser.uid = newUser.uid
      formUser.name = newUser.name
      formUser.gender = newUser.gender
    },
    {immediate: true}
)

</script>

<template>
  <Transition>
    <div v-if="isVisible" class="fixed flex inset-0 items-center justify-center bg-black bg-opacity-50">
      <div class="transform bg-white w-2/12 rounded-lg p-6 transition-transform">
        <h2 class="font-bold text-xl mb-4">Add user</h2>
        <div class="flex items-center mb-4">
          <label class="w-20">name:</label>
          <input v-model="formUser.name" class="border w-full p-2 rounded-lg"/>
        </div>
        <div class="flex items-center mb-4">
          <label class="w-20">gender:</label>
          <select v-model="formUser.gender" class="border w-full p-2 rounded-lg">
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button @click="$emit('close')" class="bg-red-500 px-4 py-2 mr-2 rounded-lg text-white">cancel</button>
          <button @click="$emit('confirm', {...formUser})" class="bg-blue-500 px-4 py-2 rounded-lg text-white">confirm
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>

</style>