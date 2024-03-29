import {Component} from 'react'
import './index.css'

class MovieCastDetails extends Component {
  state = {
    movieCastData: [],
  }

  componentDidMount() {
    this.getCastDetails()
  }

  getCastDetails = async () => {
    const {details} = this.props

    const key = '2abedcb807ab04027da1284d52c87a8b'
    const url = `https://api.themoviedb.org/3/movie/${details}/credits?api_key=${key}&language=en-US`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const imgUrl = 'https://image.tmdb.org/t/p/w500'

      const updatedData = data.cast.map(item => ({
        id: item.id,
        name: item.name,
        originalName: item.original_name,
        profilePath: imgUrl + item.profile_path,
        characterName: item.character,
      }))
      this.setState({movieCastData: updatedData})
    }
  }

  renderCastItem = item => (
    <li key={item.id} className="cast-item">
      <img src={item.profilePath} alt={item.name} className="cast-img" />
      <p className="character-name">{item.characterName} </p>
      <p className="name">{item.name} </p>
    </li>
  )

  render() {
    const {movieCastData} = this.state

    return (
      <div className="cast-container">
        <h1 className="cast-heading"> Cast Details </h1>
        <ul className="cast-item-contianer">
          {movieCastData.map(item => this.renderCastItem(item))}
        </ul>
      </div>
    )
  }
}

export default MovieCastDetails
