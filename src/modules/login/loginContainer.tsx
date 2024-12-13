import React, { FC, useEffect, useState } from 'react'
import Login from './login'

const LoginContainer:FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");

   useEffect(() => {
    setLoading(true);
   })
    const handleSubmit = () => {

    }
  return (
    <div>
        <Login
           loading = {loading}
           handleLogin = {handleSubmit}
        />
    </div>
  )
}

export default LoginContainer