import React, {Component} from 'react';
import TodoListItem from "./TodoListItem";

class TodoList extends Component {

    filteredTodos = () =>{
        const { todos, filter } = this.props;
        let completed = null;
        if(filter !== 'all') {
            completed = filter === 'completed';
        }
        return todos.filter((todo) => completed!==null? todo.completed === completed : true);
    }

    renderTodos = () => {
        const filteredTodos = this.filteredTodos();
        return filteredTodos.map((todo)=>{
            return <div key={todo.id}><TodoListItem todo={todo}/></div>
        })
    }

    render() {
        return (
            <div className='todo-list-container'>
                {this.renderTodos()}
            </div>
        );
    }
}

export default TodoList;