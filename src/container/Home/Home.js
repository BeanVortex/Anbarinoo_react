import React, { Component } from 'react'
import './Home.scss';

import Nav from '../../components/nav/Nav';
import Header from '../../components/home/header/Header';

class Home extends Component {
    render() {
        
        return (
            <div>
                <Nav className="nav"/>
                <Header/>
                
            </div>
        );
    }
}

export default Home;
