<template>
    <section class="real-app">
        <input class="add-input" type="text" autofocus="autofocus" placeholder="接下来做什么？" @keyup.enter="addTodo"/>
        <!--<Item :todo="todo"></Item>-->
        <Item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"/>
    </section>
</template>

<script>
    import  Item from './item.vue'
    import  Tabs from './tabs.vue'
    let id=0;
    export default{
        data(){
          return{
//              todo:{
//                  id:0,
//                  content:'this is todo',
//                  compelted:false
//              },
              todos:[],
              filter:'all'
          }
        },
        computed:{
            filteredTodos(){
                if(this.filter == 'all'){
                    return this.todos;
                }
                const completed = this.filter === 'completed';
                return this.todos.filter(todo => completed===todo.completed);
            }
        },
        methods:{
            addTodo(e){  //event对象
                this.todos.unshift({
                    id:id++,
                    content:e.target.value.trim(),
                    completed:false
                })
                e.target.value='';
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
            },
            toggleFilter(state){
                this.filter = state;
            },
            clearAllCompleted(){
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        },
        components:{
            Item,
            Tabs
        }
    }
</script>

<style lang="less" scoped>
    .real-app{
        width:600px;
        margin:0 auto;
        box-shadow: 0 0 5px #666;
    }
    .add-input{
        position: relative;
        width:100%;
        padding:15px;
        font-size:24px;
        border:0;
        box-shadow: inset 0 -1px 5px 0 rgba(0,0,0,0.4);
    }
</style>