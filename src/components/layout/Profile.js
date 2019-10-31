import React, { Component } from 'react';
import  SearchForm  from '../home/SearchForm';
import {connect} from 'react-redux';
import MoviesContainer from '../home/MoviesContainer'
import Spinner from '../layout/Spinner'
import {Link} from 'react-router-dom'

export class Profile extends Component {
    render() {
       const {loading} = this.props;
        return (
            <div className="container">
                <h1>Bienvenido a tu perfil </h1>
                <Link className="misfavs" to={"/favs"}><h2>Lista de favoritos</h2></Link>
                <SearchForm />
                {loading ? <Spinner /> : <MoviesContainer />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.movies.loading
})

export default connect(mapStateToProps)(Profile);