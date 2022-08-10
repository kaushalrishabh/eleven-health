import React from 'react'
import '../App.css';
import { Navigate } from 'react-router-dom';

const Landing = () => {
    
    if(localStorage.token)
    {
        return(         
            <div className="embed-responsive embed-responsive-21by9">
                <iframe className="embed-responsive-item" style={{width: "100%", height: "100vh"}} title='ElevenHealth' src="https://sense-demo.qlik.com/sso/single/?appid=cd840389-f841-4477-86be-532fb0b13775&sheet=aLvPhq&opt=ctxmenu,currsel" allowFullScreen></iframe>
            </div>
        );
    }
    else {
        return <Navigate to="/" />;
    }
}

export default Landing;