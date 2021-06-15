
// {
//     task : string,
//     id :  uuid,
//     completed : boolean
// }

import {
    CLEAR_COMPLETED_TODO,
    CREATE_TODO,
    DELETE_TODO, TOGGLE_COMPLETE_ALL,
    TOGGLE_COMPLETED,
    UPDATE_TODO
} from "../actions/Types";

const todos = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_TODO:
            // localStorage.setItem("todo", JSON.stringify(payload));
            return [...state,{...payload,completed:false}];
        case DELETE_TODO:
            return state.filter((todo) => payload !== todo.id);
        case CLEAR_COMPLETED_TODO:
            return state.filter((todo) => todo.completed !== true);
        case UPDATE_TODO:
            return state.map((todo) => {
                if(payload.id === todo.id){
                    return {
                        ...todo,
                        ...payload
                    }
                }
                return todo;
            });
        case TOGGLE_COMPLETE_ALL:
            return state.map((todo)=>({...todo,completed:payload}));
        case TOGGLE_COMPLETED:
            return state.map((todo) => {
                if(todo.id === payload){
                    return {
                        ...todo,
                        completed:!todo.completed
                    }
                }
                return todo;
            });
        default:
            return state;
    }
};

export default todos;
