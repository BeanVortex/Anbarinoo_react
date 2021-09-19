import React, { Component } from 'react'
// import Cargo from './cargo/Cargo';
import './Home.scss';
import Nav from '../../components/nav/Nav';

class Home extends Component {
    render() {
        
        return (
            <div>
                <Nav/>
                <header className="header">
                    <div className="profit-indicator">
                        <h3>+18 %</h3>
                        <p>این ماه</p>
                    </div>
                    <div className="receive-link">
                        <button href="#" className="selected">ارسال شده</button>
                        <button href="#"> دریافت شده</button>
                    </div>
                    <div className="cargos">

                    </div>
                </header>
            </div>
        );
    }
}

export default Home;
