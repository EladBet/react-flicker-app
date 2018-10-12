import React, { Component } from 'react';
import { searchTerm } from './search-service';
import Search from './Search';
import Photos from './Photos';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchValue: 'cat',
            photos: []
        };
        this.search = this.search.bind(this);
        this.searchTermChanged = this.searchTermChanged.bind(this);
    }

    componentDidMount() {
        this.search();
    }

    searchTermChanged(e) {
        this.setState({ searchValue: e.target.value });
    }

    search(e) {
        this.setState({ loading: true });
        searchTerm(this.state.searchValue)
            .then(photos => this.setState({ photos, loading: false }))
            .catch(err => this.setState({ photos: [], loading: false }));
    }

    render() {
        return (
            <div className="App">
                <Search
                    search={this.search}
                    searchTermChanged={this.searchTermChanged}
                    searchValue={this.state.searchValue}
                />

                <div>
                    {this.state.loading && (
                        <div>Loading...</div>
                    )}

                    {this.state.photos.length === 0 && !this.state.loading && (
                        <div>Can't find photos for this search term</div>
                    )}

                    {this.state.photos.length > 0 && !this.state.loading && (
                        <Photos photos={this.state.photos} />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
