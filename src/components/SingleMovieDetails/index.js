import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MovieCastDetails from '../MovieCastDetails'
import Header from '../Header'
import './index.css'

class SingleMovieDetails extends Component {
  state = {
    singleMovieData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getSingleMovieDetails()
  }

  getSingleMovieDetails = async () => {
    const key = '2abedcb807ab04027da1284d52c87a8b'

    const {match} = this.props
    const movieId = match.params.movie_id

    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-U`

    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const imgUrl = 'https://image.tmdb.org/t/p/w500'
      const updatedData = {
        id: data.id,
        posterPath: imgUrl + data.poster_path,
        title: data.title,
        rating: data.vote_average,
        duration: data.runtime,
        genre: data.genres,
        releaseDate: data.release_date,
        overview: data.overview,
      }

      this.setState({singleMovieData: updatedData, isLoading: false})
    }
  }

  renerLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  renderSingleMovieContent = () => {
    const {singleMovieData} = this.state
    return (
      <>
        <h1 className="movie-details-heading"> Movie Details </h1>
        <div className="single-movie-details-container">
          <img
            src={singleMovieData.posterPath}
            alt={singleMovieData.title}
            className="single-movie-img"
          />
          <div className="single-movie-text-content">
            <p className="single-movie-title">
              {' '}
              <span>Movie Title: </span>
              {singleMovieData.title}{' '}
            </p>
            <p className="rating">
              {' '}
              <span>Rating:</span> {singleMovieData.rating}{' '}
            </p>
            <p className="duration">
              {' '}
              <span>Duration:</span> {singleMovieData.duration} Min{' '}
            </p>
            <ul className="genre-list">
              <span>Genre: </span>
              {singleMovieData.genre.map(item => (
                <li key={item.id} className="genre-item">
                  {'  '}
                  {item.name},
                </li>
              ))}
            </ul>
            <p className="overview">
              {' '}
              <span>Overview: </span> {singleMovieData.overview}{' '}
            </p>
          </div>
        </div>
      </>
    )
  }

  renderMovieCastDetails = () => {
    const {match} = this.props
    const movieId = match.params.movie_id
    return <MovieCastDetails details={movieId} />
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />
        <div className="single-movie-container">
          <div className="single-movie-responsive-container">
            {isLoading ? this.renerLoader() : this.renderSingleMovieContent()}
            {isLoading ? this.renerLoader() : this.renderMovieCastDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default SingleMovieDetails
