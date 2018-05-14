<template>
    <div :class="['todo-item',todo.completed ? 'completed':'']">
        <input type="checkbox" class="toggle" v-model="todo.completed"/>
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
    export default{
        props:{
            todo:{
                type:Object,
                required:true,
            }
        },
        methods:{
            deleteTodo(){
                this.$emit('del',this.todo.id);
            }
        }
    }

</script>
<style lang="less" scoped>
    .todo-item{
        position: relative;
        background-color: #fff;
        font-size: 24px;
        border-bottom: 1px solid rgba(0,0,0,0.06);
        padding:0 24px;
        width:97%;
    }
    .destory{
        display: inline;
        border:none;
        position: absolute;
        right:10px;
        bottom:13px;
        font-size:24px;
        background-color:white;
    }
    .todo-item:hover .destory:after{
        content:'x';
        color:cornflowerblue;
        border:none;
    }
    label{
        white-space: pre-line;
        word-break:break-all;
        padding:15px 60px 15px 15px;
        margin-left:45px;
        display: block;
        line-height: 1.2em;
        transition:color 0.4s;
    }
    .completed{
        color:#d9d9d9;
        text-decoration: line-through;
    }
    .toggle{
        text-align: center;
        width: 40px;
        height: 40px;
        position: absolute;
        top:0;
        bottom:0;
        margin:auto 0;
        background-color: #fff;
        -webkit-appearance:none;
        border: none;
        outline:none;
    }
    .toggle:before{
        content:"";
        background-image:url('../assets/images/box.png');
        background-size:100%;
        width:40px;
        height:40px;
        position: absolute;
        z-index:1;
        left:2px;
     }
    .toggle:checked:before{
        content:"";
        background-image:url('../assets/images/select.png');
        background-size:100%;
        width:40px;
        height:40px;
        position: absolute;
        z-index:1;
        left:2px;
     }
</style>