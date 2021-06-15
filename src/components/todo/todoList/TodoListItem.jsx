import React, {Component} from 'react';
import {updateTodo,toggleCompleted,deleteTodo} from '../../../store/actions/Todo'
import {connect} from "react-redux";

class TodoListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            editTask:''
        }
    }

    getIconClass = (completed) =>{
        if(this.state.showInput){
            return 'todo-list-item--icon__fade';
        }
        return completed?'todo-list-item--icon__active':''
    }

    showInput = () =>{
        const {todo} = this.props;
        const {task} = todo;
        this.setState({
            showInput:true,
            editTask:task
        });
    }

    onInputChange = (e) =>{
        this.setState({
            showInput:true,
            editTask:e.target.value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const {todo} = this.props;
        this.props.updateTodo({
            ...todo,
            task:this.state.editTask
        })
        this.setState({showInput:false});
    }

    toggleCompleted = () =>{
        const id = this.props?.todo?.id;
        this.props.toggleCompleted(id);
    }

    deleteTodo = () =>{
        const id = this.props?.todo?.id;
        this.props.deleteTodo(id);
    }

    render() {
        const {todo} = this.props;
        const {showInput,editTask} = this.state;
        const {task, completed} = todo;
        const iconClass = this.getIconClass(completed);
        return (
            <div className='todo-list-item'>
                <div
                    onClick={this.toggleCompleted}
                    className={`todo-list-item--icon ${iconClass}`}>
                    <i className="fas fa-check"/>
                </div>

                { showInput ? (
                    <form onSubmit={this.onSubmit}>
                        <input
                            className='todo-list-item--input'
                            onBlur={this.onSubmit}
                            onChange={this.onInputChange}
                            value={editTask}
                            type='text'
                            autoComplete="off"
                            autoFocus
                        />
                    </form>
                ):(
                    <>
                        <p
                            onDoubleClick={this.showInput}
                            className={`todo-list-item--task ${completed?'todo-list-item--task__completed':''}`}>
                            {task}
                        </p>
                        <div onClick={this.deleteTodo} className='todo-list-item--close'>
                        <i className="fas fa-times"/>
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default connect(null, {deleteTodo, updateTodo, toggleCompleted})(TodoListItem);