import React ,{useState}  from 'react'
import {auth, googleProvider} from "../config/firebase"
import {createUserWithEmailAndPassword ,signInWithPopup ,signOut} from 'firebase/auth'


export const Auth = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const signin = async () => {
        try{

            await createUserWithEmailAndPassword(auth,email,password)
        } catch(error){
            console.error(error)
        }
    }
    const signinWithGoogle = async () => {
        try{

            await signInWithPopup(auth, googleProvider)
        } catch(error){
            console.error(error)
        }
    }
    const SignOut = async () => {
        try{

            await signOut(auth, googleProvider)
        } catch(error){
            console.error(error)
        }
    }
  return (
    <div>
        <input type="text" placeholder='email' onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
        <button onClick={signin}>Sign in</button>
        <button onClick={signinWithGoogle}>Sign in with google</button>
        <button onClick={SignOut}>Sign Out</button>
    </div>
  )
}