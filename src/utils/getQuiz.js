import europeanCountries from '../data/european-countries.json'
import jamesBondMovies from '../data/james-bond-movies.json'
import pokemon from '../data/pokemon-151.json'
import usStates from '../data/us-states.json'
import worldwideCountries from '../data/worldwide-countries.json'

export const getQuiz = (quiz) => {
    if (quiz === 'european-countries') {
      return europeanCountries
    }else if (quiz === 'james-bond-movies'){
      return jamesBondMovies
    }
    else if (quiz === 'pokemon-151') {
      return pokemon
    } else if (quiz === 'us-states') {
      return usStates
    } else if (quiz === 'worldwide-countries') {
      return worldwideCountries
    }
  }