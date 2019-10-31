import React, { Component } from 'react';
import {connect} from 'react-redux';
import {searchMovie, fetchMovies, setLoading} from '../../actions/searchActions';

class SearchForm extends Component {
    constructor(props){
        super(props)
        this.state={
            text: ''
        }
    }
onChange= e => {
 this.setState({text: e.target.value});
}

onSubmit= e => {
    e.preventDefault();
    this.props.fetchMovies(this.state.text);
    this.props.setLoading();
}

    render() {
        console.log(this.Search)
        return (
           <div className="jumbotron jumbotron-fluid mt-5 text center">
               <div className="container">
                   <h1 className="display-4 mb-3">
                       Todo lo que quieras saber sobre tus series y peliculas favoritas!
                   </h1>
                   <form id="searchForm" onSubmit={this.onSubmit}>
                       <input
                        type="text"
                        className="form-control"
                        name="searchText"
                        placeholder="Ingrese el titulo de la pelicula o serie que busca"
                        onChange={this.onChange}
                        />
                        
                        <button type="submit" className="btn btn-primary btn-bg mt-3">
                           Buscar
                        </button>
                   </form>
               </div>
           </div>
        )
    }
}

const mapStateToProps = state => ({
    text: state.movies.text
})
const mapDispatchToProps = dispatch => ({
    searchMovie: (text)=>dispatch(searchMovie(text)),
    fetchMovies: (text)=>dispatch(fetchMovies(text)),
    setLoading: ()=>dispatch(setLoading())
})
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

