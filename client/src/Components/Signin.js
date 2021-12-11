import React, { useState, useContext } from 'react'
import man_laptop from "../img/man_laptop.svg"
import { NavLink, useHistory } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../App"

function Signin() {

    const { state, dispatch } = useContext(UserContext)

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const LoginUser = async (e) => {
        e.preventDefault();

        // const {name, email, phone, work, password, cpassword} = user;
        const res = await fetch("https://taxableincome-vidhish.herokuapp.com/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
            credentials: 'include',
            body: JSON.stringify({
                email, password
            })

        }).then((res) => res.json())
        // const data = res.json();
        // console.log(data);
        localStorage.setItem("token", res.token)
        if (res.status === 400) {
            window.alert("Invalid Credentials")
        } else {
            dispatch({ type: "USER", payload: true })
            window.alert("Login Successful");
            // const notiftoast =()=> toast.success('Login Successful', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     });
            //     notiftoast();
            history.push("/calc")
        }

    }


    return (
        <>
            <div className="signin_div">

                <div className="row">
                    {/* image div */}
                    <div className="col-lg-6 col-sm-12">
                        <img src={man_laptop} alt="woman_laptop" className="manimg_signin" />
                    </div>
                    {/* form div */}
                    <div className="col-lg-6 col-sm-12">
                        <h1 style={{ marginLeft: "10%", paddingTop: "50px", paddingBottom: "10px" }}>Sign in</h1>
                        <form method="POST" className="signin_form_div">

                            <div class="form-group">
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    autoComplete="off"
                                    type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                            </div>

                            <div class="form-group">
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    autoComplete="off"
                                    type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>


                            <button type="submit" class="btn btn-primary" onClick={LoginUser}>Login</button>
                            <NavLink to="/signup"><p style={{ marginTop: "10px" }}>New here? Signup</p></NavLink>
                        </form>
                    </div>

                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Signin
