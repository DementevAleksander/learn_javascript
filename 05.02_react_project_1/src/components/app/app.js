import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import WhoAmIAll from '../test_project/test_project';

import './app.css';

export default class App extends Component { //Компонент с приложением
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {label: "Going to learn React", important: true, id: 1},
                {label: "That is so good", important: false, id: 2},
                {label: "I need a break...", important: false, id: 3},
                {label: "4", important: false, id: 4}
            ]
        };
        this.deletedItem = this.deletedItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.maxId = 5;
    }

    deletedItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];
            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList 
                    posts={this.state.data}
                    onDeleted={this.deletedItem} />
                <PostAddForm
                    onAdd={this.addItem} />
                <WhoAmIAll/>
            </div>
        )
    }
}