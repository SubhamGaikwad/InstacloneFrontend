import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import M from 'materialize-css';
const Signin=()=>{
    const navigate = useNavigate()
    const[name,setName] = useState("")
    const[password,setPasword] = useState("")
    const[email,setEmail] = useState("")
    const[image,setImage] = useState("")
    const[url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    })

    const uploadPic=()=>{
        const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","insta-clone")
      data.append("cloud_name","dhcp7pbfg")
      fetch("https://api.cloudinary.com/v1_1/dhcp7pbfg/image/upload",{
        method:"post",
        body:data
      })
      .then(res=>res.json())
      .then(data=>{
        setUrl(data.url)
      })
      .catch(err => {
        console.log(err)
      })
    }
    const uploadFields=()=>{
        if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid email",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })

        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                M.toast({html: data.message,classes:"#4caf50 green"})
                navigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()

        }
       
    }
    return(
        <div className='mycard'>
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
                <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPasword(e.target.value)}
                />
                <div class="file-field input-field">
                <div className="btn #64b5f6 blue darken-1">
                <span>Upload Pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button class="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >
                   SignUp
                </button>
                <h5>
                    <Link to="/signin">Already have an account ? </Link>
                </h5>

            </div>
        </div>
    )
}
export default Signin