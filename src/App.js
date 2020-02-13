import React from "react"

import ImageSearch from "./imageSearch/ImageSearch"
import ImageList from "./imageList/ImageList"

const API_KEY = "15119996-090fc7096640b79453921b17e"

class App extends React.Component {
  state = {
    images: [],
    error: null
  }
  handleGetRequest = async (e) => {
    e.preventDefault()
    const searchTerm = e.target.elements.searchValue.value
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&image_type=photo`
    const request = await fetch(url)
    const response = await request.json()
    if (!searchTerm) {
      this.setState({ error: "Please provide a value!" })
    } else {
      this.setState({ images: response.hits, error: null })
    }
    
  }
  render() {
    return (
      <div>
        <ImageSearch handleGetRequest={this.handleGetRequest} />
        {
          this.state.error !== null ? 
          <div style={{color: "#fff", textAlign: "center"}}>{this.state.error}</div> :
          <ImageList images={this.state.images} />
        }        
      </div>
    )
  }
}

export default App


// {this.state.images.length > 0 && this.state.images.map((image) => {
//   return <p key={image.id}>{ image.tags }</p>
//   })}