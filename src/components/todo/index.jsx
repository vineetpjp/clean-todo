import React, {Component} from 'react';
import {connect} from 'react-redux';
import CreateInput from "./CreateInput";
import ControlBar from "./ControlBar";
import TodoList from "./todoList";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props?.todo||[],
            filter:'all'
        }
    }

    static getDerivedStateFromProps(props, state){
        return {
            ...state,
            todos:props.todo,
            filter:props.todo.length===0?'all':state.filter
        }
    }

    setFilter = (filter) =>{
        this.setState((prevState)=>({
            ...prevState,
            filter
        }))
    }

    render() {
        const {filter,todos} = this.state;
        return (
            <div className='todo'>
                <p className='heading-large'>todos</p>
                <div className='todo-container'>
                    <CreateInput isTodo={todos.length>0}/>
                    <TodoList todos={todos} filter={filter}/>
                    <ControlBar activeFilter={filter} todos={todos} setFilter={this.setFilter}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({todo}) =>({todo});

export default connect(mapStateToProps)(Todo);