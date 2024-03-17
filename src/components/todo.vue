<template>
  <div class = "badass-todo">

    <div class = "title has-text-centered">
      Badass Todo
    </div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input v-model ='newTodoContent'class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div></form>



    <div class="card mb-5" v-for="todo in todos"
         :class="{ 'has-background-success-light' : todo.done}">
      <div class="card-content">
        <div class="content">


          <div class="columns is-mobile is v-centered">
            <div class="column"
                 :class="{'has-text-success line-through' : todo.done}"
            >{{todo.content}}</div>

            <div class="column">
              <button class = "button"
                      :class = "todo.done ? 'is-success' : 'is-light'"
                      @click = "toggleDone(todo.id)"
              >&check;</button>
              <button
                  class = "button is-danger ml-2"
                  @click="deleteTodo(todo.id)"
              >
                &cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>

import {ref, onMounted} from 'vue';
import {collection, getDocs, where, onSnapshot, addDoc, doc,
  deleteDoc, updateDoc, query, orderBy, limit} from "firebase/firestore"
import{db} from '@/firebase'

const todosCollectionRef = collection(db, "todos")

const q = query(todosCollectionRef, orderBy("date", "desc"))

const todos = ref([



])

onMounted(() => {
  onSnapshot(q, (querySnapshot) => {
    const fbTodos = []
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
})

const newTodoContent = ref('')
const addTodo = async () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
  })
  newTodoContent.value = ''
}

const deleteTodo = id => {
  deleteDoc(doc(todosCollectionRef,id))
}

const toggleDone = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  updateDoc(doc(todosCollectionRef,id), {
    done: !todos.value[index].done
  })
}
</script>



<style>
@import 'bulma/css/bulma.css';

.badass-todo {
  max-width: 700px;
  padding: 20px;
  margin: 0;

}

.line-through{
  text-decoration: line-through;
}
</style>



