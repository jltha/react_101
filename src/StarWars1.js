import React from 'react';

class FilmItemRow extends React.Component {
    render() {
        return(
            <li>
                {/* <a href={this.props.url}>{this.props.url}</a> */}
                {this.props.film}
            </li>
        );
    }
}
  
  
class StarWars1 extends React.Component {
    constructor() {
      super();
  
      this.state = {
        name: null,
        height: null,
        homeWorld: null,
        films: [],
        isCharacterLoaded: false
      };
    }
  
    getFilmNames(filmLinks) {
        const fetchPromises = filmLinks.map(url =>
          fetch(url)
            .then(response => response.json())
            .then(data => ({'index': data.episode_id , 
                            'content': `${data.title}, episode ${data.episode_id}`}))
        );
      
        return Promise.all(fetchPromises);
    }

    getNewCharacter() {
        const randomNumber = Math.round(Math.random() * 83);
        const url = `https://swapi.dev/api/people/${randomNumber}/`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            fetch(data.homeworld)
              .then(response => response.json())
              .then(homeWorldData => {
                this.getFilmNames(data.films).then(filmNames => {
                  this.setState({
                    name: data.name,
                    height: data.height,
                    homeWorld: homeWorldData.name,
                    films: filmNames.sort((a, b) => a.index - b.index)
                                    .map(filmObject => filmObject.content),
                    isCharacterLoaded: true
                  });
                });
              });
          });
      }
  
    render() {
        const movies = this.state.films.map((film, index) => {
            return <FilmItemRow film={film} key={index}/>
        }) 
  
      return (
          <div>
            {
              this.state.isCharacterLoaded &&
              <div>
                <h1>Name: {this.state.name}</h1>
                <h2>Height: {this.state.height} cm</h2>
                {/* <p><a href={this.state.homeWorld} id="homeWorld">HomeWorld</a></p> */}
                <h2>Origin: {this.state.homeWorld}</h2>
                <h2>Appeared in:</h2>
                <ul>
                  {/* {
                    this.state.films.map((film, index) => {
                        return <li key={index}>{film}</li>
                    })
                  } */}
                  {movies}
  
                </ul>
              </div>
            }
            <button 
              className="btn" 
              onClick={() => this.getNewCharacter()}
            >
              Randomise Character
            </button>
          </div>
      );
    }
  }

  export default StarWars1;