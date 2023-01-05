import React, { useState,useContext } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {UserContext} from '../../App';

import M from 'materialize-css';
const Signin=()=>{
    const{state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const[password,setPasword] = useState("")
    const[email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid email",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("https://instaclonebani.onrender.com/signin",{//http://localhost:5000
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })

        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signedin success",classes:"#4caf50 green"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>InstaClone</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
                />
                <button class="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                   Login
                </button>
                <h5>
                    <Link to="/signup">Dont have an account</Link>
                </h5>

            </div>
        </div>
    )
}
export default Signin