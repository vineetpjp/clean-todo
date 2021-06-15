import React, {Component} from 'react';
import {connect} from "react-redux";
import {createTodo,toggleCompleteAll} from '../../store/actions/Todo'

class CreateInput extends Component {

    constructor(props) {
        super(props);
        this.state ={
            task:'',
            completeAll:true
        }
    }

    static getDerivedStateFromProps = (props,prevState)=>{
        if(props.isTodo===false){
            return {
                ...prevState,
                completeAll:true
            }
        }
        return null;
    }

    onChange = (e) =>{
        this.setState({task:e.target.value});
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const task = this.state.task;
        if(task){
            this.props.createTodo(task);
            this.setState({task:''});
        }
    }

    toggleCompleteAll = () =>{
        this.props.toggleCompleteAll(this.state.completeAll);
        this.setState(prevState=>({
            ...prevState,
            completeAll:!prevState.completeAll
        }))
    }

    getIconClass = (isTodo, completeAll) =>{
        if(!isTodo)
            return 'icon--fade';
        return !completeAll?'icon--active':'';
    }

    render() {
        const {completeAll} = this.state;
        const {isTodo} = this.props;
        const iconClass = this.getIconClass(isTodo,completeAll);
        return (
            <div className='todo-container-create'>
                <div onClick={this.toggleCompleteAll}
                     className={`icon ${iconClass}`}>
                    <i className="fas fa-chevron-down"/>
                </div>
                <form id='create-input-form' onSubmit={this.onSubmit}>
                <input
                    id='create-input'
                    type='text'
                    placeholder='What needs to be done?'
                    value={this.state.task}
                    onChange={(e)=>this.onChange(e)}
                    autoComplete='off'
                />
                </form>
            </div>
        );
    }
}

export default connect(null,{createTodo,toggleCompleteAll})(CreateInput);
