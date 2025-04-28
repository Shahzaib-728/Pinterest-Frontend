import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import MainBoard from './components/MainBoard'
import Unsplash from './api/unsplash'

function App() {
  const [pins, setNewPins] = useState([]);

  const getImages = (item) => {

    return Unsplash.get("https://api.unsplash.com/search/photos", {
      params: 
      {
        query: item
      }
    });

  };

  const onSearchSubmit = (item) => {
    // console.log("on search ",item)
    getImages(item).then((res) => {
      let results = res.data.results;
      let newPins = [
        ...results,
        ...pins,
      ]

      newPins.sort(function (a, b) {
        return 0.5 - Math.random();
      })
      setNewPins(newPins)
    })
  }

  const getNewPins = () => {
    let promises = []
    let pinData = []
    let pins = ['ocean', 'tokyo', 'cats', 'dogs', 'car']

    pins.forEach((pinterm) => {
      promises.push(
        getImages(pinterm).then((res) => {
          let results = res.data.results;
          pinData = pinData.concat(results)
          pinData.sort(function (a, b) {
            return 0.5 - Math.random()
          })
        }
        )
      )
    })
    Promise.all(promises).then(() => {
      setNewPins(pinData)
    })
  }

  useEffect(() => {
    getNewPins();
  }, []);
  
  return (
    <>
      <Header onSubmit={onSearchSubmit} />
      <MainBoard pins={pins} />
    </>
  )
}

export default App
