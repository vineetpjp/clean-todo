import React, {Component} from 'react';
import {clearCompletedTodo} from '../../store/actions/Todo'
import {connect} from "react-redux";

class ControlBar extends Component {

    getActiveTodos  = (todos) =>{
        return todos.reduce((acc, todo) => {
            return acc + Number(!todo.completed);
        }, 0);
    }

    renderFilters = () =>{
        const filters = ['all','active','completed'];
        const {activeFilter,setFilter} = this.props;
        return filters.map((filter,index)=>{
            const activeClass = filter === activeFilter?'filter__active':'';
            const capitalisedFilter = filter.charAt(0).toUpperCase() + filter.slice(1);
            return (<p
                    key={index}
                    onClick={()=>setFilter(filter)}
                    className={`filter ${activeClass}`}>
                        {capitalisedFilter}
                    </p>)
        })
    }

    render() {
        const {todos,clearCompletedTodo} = this.props;
        if(!todos.length){
            return null;
        }
        const activeTodos = this.getActiveTodos(todos);
        const showClear = todos.length-activeTodos>0;
        return (
            <div className='control-bar-container'>
                <div className='control-bar'>
                    <div>{activeTodos} item left</div>
                    <div className='control-bar-filters'>
                        {this.renderFilters()}
                    </div>
                    {showClear?(
                        <div
                            className='clear-completed'
                            onClick={clearCompletedTodo}
                        >Clear completed</div>
                    ):<div/>}
                </div>
                <div
                    className='control-bar-footer'
                    style={{
                        '--bottom':'-0.45rem',
                        '--width':'99%',
                        '--zIndex':'2'
                    }}/>
                <div
                    className='control-bar-footer'
                    style={{
                        '--bottom':'-0.9rem',
                        '--width':'98%',
                        '--zIndex':'1'
                    }}/>
            </div>
        );
    }
}

export default connect(null,{clearCompletedTodo})(ControlBar);