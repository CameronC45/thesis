import React from "react";

const Navbar = () => {
    return ( 
        <nav className="navbar" >
            <h1 style={{ cursor: "pointer" }}
                onClick={_ => window.location.href = "/"}>{"Buy & Sell"}</h1>
            <input 
                style={{ borderColor:"#f1356d",width: "40%",marginLeft: "auto", marginRight: "auto"}}
                type="text"
                placeholder="Search..."
                onKeyPress={event => {
                    if(event.key == 'Enter'){
                        window.location.assign('/search/'+event.target.value)
                    }
                }}></input>
            <div className="links">
            <a  style={{ cursor: "pointer" }}
                    onClick={_ => window.location.href = "/create/"}>Add Advert</a>
                <a  style={{ cursor: "pointer" }}
                    onClick={_ => window.location.href = "/profile/"}>Profile</a>
            </div>
        </nav>
     );
}
 
export default Navbar;