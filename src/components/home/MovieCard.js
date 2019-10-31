import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux';

export class MovieCard extends Component {
  constructor(props){
    super(props)
    this.state={
    }
}
  onSubmit= e => {
    e.preventDefault()
    const movie = this.props.movie;
    axios.post(`http://localhost:3001/addtofav`, {
    movieID: movie.imdbID,
    movieTitle: movie.Title,
    movieYear: movie.Year,
    movieImage: movie.Poster
    })
    .then((res)=> {
      console.log('soy movieee', res.data)
  })
    .catch(()=>alert("Necesitas estar loggeado para añadir una pelicula a favoritos"))
    }

    render() {
      console.log(this.props)
        const movie = this.props.movie
        return (
                <div className="col-md-3 mb-5">
                <div className="card card-body bg-dark text-center h-100">
                <img className="w-100 mb-2" src={movie.Poster} alt="Movie Cover" />
                <h5 className="text-light card-title">
                {movie.Title} - {movie.Year}
                </h5>
                <Link className="btn btn-primary" to={'/movie/' + movie.imdbID}>
                Movie Details
          </Link>
          <button type="submit" onClick={this.onSubmit}>Add to favorites</button>
        </div>
      </div>
           
        )
    }
}

const mapStateToProps = state => ({
  user: state.movies.user,
})
const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
