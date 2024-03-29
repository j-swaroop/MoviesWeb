import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Movie from '../Movie'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PREOGRESS',
}

class Home extends Component {
  state = {
    homeData: [],
    apiStatus: apiConstants.initial,
    pageNo: 1,
    searchVal: '',
  }

  componentDidMount() {
    this.getHomeData()
  }

  getHomeData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const {pageNo, searchVal} = this.state

    const key = '2abedcb807ab04027da1284d52c87a8b'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${pageNo}`

    // const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${searchVal}&page=1`

    // const urll = searchVal !== '' ? searchUrl : url

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const imgUrl = 'https://image.tmdb.org/t/p/w500'
      const updated = data.results.map(item => item)
      const updatedData = updated.map(item => ({
        posterPath: imgUrl + item.poster_path,
        id: item.id,
        title: item.title,
        rating: item.vote_average,
      }))

      this.setState({homeData: updatedData, apiStatus: apiConstants.success})
    }
  }

  renerLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" height={50} width={50} />
    </div>
  )

  onClickPrevPage = () => {
    const {pageNo} = this.state

    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getHomeData,
      )
    }
  }

  onClickNextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getHomeData,
    )
  }

  renderHomeContent = () => {
    const {homeData, pageNo} = this.state
    return (
      <>
        <p className="pageno"> Page No: {pageNo} </p>
        <ul className="movies-list">
          {homeData.map(item => (
            <Movie details={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  renderData = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderHomeContent()
      case apiConstants.inProgress:
        return this.renerLoader()
      default:
        return null
    }
  }

  onGetSearchInput = val => {
    this.setState({searchVal: val}, this.getHomeData)
  }

  render() {
    const {homeData, pageNo} = this.state
    const disabledBtn = pageNo <= 1 ? 'disabled-btn' : ''
    return (
      <>
        <Header onGetSearchInput={this.onGetSearchInput} />
        <div className="home-container">
          <div className="home-responsive-container">{this.renderData()}</div>
          <div className="btns-container">
            <button
              type="button"
              onClick={this.onClickPrevPage}
              className={`btn ${disabledBtn}`}
              disabled={pageNo === 1}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={this.onClickNextPage}
              className="btn"
            >
              Next
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
