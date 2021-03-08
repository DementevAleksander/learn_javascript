import React, {Component} from 'react';
import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
       super(props);
       this.buttons = [
           {name: 'all', label: 'Все', classColor: ''},
           {name: 'like', label: <i className="fa fa-heart"></i>, classColor: 'red'},
           {name: 'important', label: <i className="fa fa-star"></i>, classColor: 'yellow'},
       ];
    }

   render() {

       const buttons = this.buttons.map(({name, label, classColor}) => {
           const {filter, onFilterSelect} = this.props;
           const active = filter === name;
           const clazz = active ?
           `btn-info ${classColor}`
           : 'btn-outline-secondary'
           return (
                <button type='button'
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => onFilterSelect(name)}>
                    {label}
                </button>

                // <button 
                // type="button" 
                // className="btn-star btn-sm"
                // onClick={onToggleImportant}>
                //     <i className="fa fa-star"></i>
                // </button>
           )
       });

       return (
           <div className="btn-group">
               {buttons}
           </div>
       )
   }
}