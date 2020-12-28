import React, { useEffect, useState } from 'react'
import './Main.css'

import Logo from  '../assets/logo.svg'
import Deslike from  '../assets/dislike.svg'
import Like from  '../assets/like.svg'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Main({match}){
    const [devs, setDevs] = useState([])

    useEffect(()=>{
        api.get('/devs', {headers: {user: match.params.id}}).then(response => {
            setDevs(response.data)
        }).catch(err=> {
            console.error(err)
        })
    }, [match.params.id])

    function handleLikeOrDeslike(id, type){
        api.post(`devs/${id}/${type}`, null, {headers: {user: match.params.id}})
        .then(response => {
            setDevs(devs.filter(dev => dev._id !== id))
        }).catch(err => {
            console.error(err)
        })
    }
    return(
       <div className="main-container">
           <Link to="/">
            <img src={Logo} alt="Tindev"/>
           </Link>
          
            {devs.length > 0 ? (
                 <ul>
                    {devs.map(dev => {
                        return(
                             <li key={dev._id}>
                                 <img src={dev.avatar} alt={dev.name}/>
                                 <footer>
                                     <strong>{dev.name}</strong>
                                     <p>{dev.bio}</p>
                                 </footer>
                                 <div className="buttons">
                                     <button type="button" onClick={e => handleLikeOrDeslike(dev._id, 'deslike')}>
                                         <img src={Deslike} alt="Deslike"/>
                                     </button>
                                     <button type="button" onClick={e => handleLikeOrDeslike(dev._id, 'like')}>
                                         <img src={Like} alt="Like"/>
                                     </button>
                                 </div>
                             </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="empty">
                    Não tem Devs Disponíveis :(
                </div>
            ) }
           
       </div>
    )
}