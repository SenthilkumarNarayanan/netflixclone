import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({title, category}) => {
const [apiData, setApiData]= useState([])

    const cardsRef=useRef();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2E4N2ZhNjI3ZjA2MjRhMzU5ODc2YjI0ZGI2MjE2MCIsIm5iZiI6MTc0MDkyMzMyNS44Miwic3ViIjoiNjdjNDYxYmQ4YmQ3ZWNiMTJiNGIxZTBhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BbZDM0HGZWIfgFba8fPDSFmkSkKm_BgWkOq9Vy4qAzI'
        }
      };
      
      
const handleWheel =(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=event.deltaY;
}
useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response=> setApiData(response.results))
        .catch(err => console.error(err));

cardsRef.current.addEventListener('wheel', handleWheel)
},[])
  return (
    <div className='titlecards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((apiData,index)=>{
            return <Link to={`/player/${apiData.id}`}><div className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+apiData.backdrop_path} alt="" />
                <p>{apiData.title}<br/><span className='realsedate'><span className='release'>Released on</span> {apiData.release_date}</span></p>
                </div></Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
