import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    inputVal: '',
  }

  onChangeInputVal = event => {
    this.setState({inputVal: event.target.value})
  }

  onClickSearch = () => {
    const {inputVal} = this.state
    const {onGetSearchInput} = this.props

    onGetSearchInput(inputVal)
  }

  render() {
    return (
      <nav className="header-container">
        <div className="header-responsive">
          <h1 className="page-heading"> movieDB </h1>
          <div className="nav-items-container">
            <Link to="/" className="nav-item">
              {' '}
              <h1 className="nav-item"> Popular </h1>{' '}
            </Link>
            <Link to="/top-rated" className="nav-item">
              {' '}
              <h1 className="nav-item"> Top Rated </h1>{' '}
            </Link>
            <Link to="/upcoming" className="nav-item">
              {' '}
              <h1 className="nav-item"> Upcoming </h1>{' '}
            </Link>
          </div>
          
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
