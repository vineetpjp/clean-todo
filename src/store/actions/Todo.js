import {v4} from 'uuid';
import {
    CLEAR_COMPLETED_TODO,
    CREATE_TODO,
    DELETE_TODO, LOAD_TODO,
    TOGGLE_COMPLETE_ALL,
    TOGGLE_COMPLETED,
    UPDATE_TODO
} from "./Types";

export const loadTodo = () => (dispatch) =>{
    if (localStorage?.todos) {
        const todosData = JSON.parse(localStorage.todos);
        dispatch({type: LOAD_TODO,payload:todosData})
    }
}

export const createTodo = (task) => (dispatch) =>{
    const id = v4();
    dispatch({ type: CREATE_TODO, payload: {id, task}});
}

export const deleteTodo = (id) => (dispatch) =>{
    dispatch({type: DELETE_TODO,payload:id});
}

export const updateTodo = (data) => (dispatch) =>{
    dispatch({type:UPDATE_TODO,payload:data});
}

export const clearCompletedTodo = () => (dispatch) =>{
    dispatch({type:CLEAR_COMPLETED_TODO});
}

export const toggleCompleted = (id) => (dispatch) =>{
    dispatch({type: TOGGLE_COMPLETED, payload:id});
}

export const toggleCompleteAll = (completed) => (dispatch) =>{
    dispatch({type:TOGGLE_COMPLETE_ALL,payload:completed});
}