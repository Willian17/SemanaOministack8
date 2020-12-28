import React, { useState } from 'react'

import './Login.css'
import Logo from '../assets/logo.svg'
import api from '../services/api'

export default function Login({history}){
    const [username, setUsername] = useState('')
    
    function handleSubmit(e){
        e.preventDefault()

         api.post('/devs', {username}).then(response => {
             const  { _id } = response.data
             history.push(`/dev/${_id}`)
         }).catch(err => {
             console.log(err)
         })

    }
    return (
        <div className="login-container">
            <form>
                <img src={Logo} alt="Tindev"/>
                <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Digite seu Usuário no Github"
                />
                <button 
                    type="submit"
                    onClick={e => handleSubmit(e)}
                >Enviar</button>
            </form>
        </div>
    )
}