import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Header from './Header';
import "../../styles/home.scss";
import triangle from './triangle.svg'
import homeBackground from '../../assets/homeBackground.png';

class Home extends PureComponent {
    static propTypes = {}

    loadingWidth = 50;
    constructor(props) {
        super(props)
        this.state = {
            loadingBarCount: 1,
            date:  new Date().toLocaleDateString().replaceAll("/",". "),
        }

        this.my_func();
    }

    my_func = () => {
        console.log("adding one to"  + this.loadingWidth);
        let num = this.state.loadingBarCount + 0.01;
        this.setState({loadingBarCount:  num <=100 ? num : 0});

        setTimeout( this.my_func, 1 );
    }

    render() {
        return (
            <div className="container">

                <div className="headerDiv">
                    <Header />
                </div >

                <div className="containerOfText">
                    <div className="containerTime">
                        <p className="time">{new Date().toLocaleTimeString()}</p>
                        <p className="date">{this.state.date}</p>
                        <p className="nameDay"> nameday: Janka</p>
                    </div>



                    <div className="nameContainer">
                        <p className="name">Cyber Office 2077</p>

                    </div>

                </div>

                <div className="containerOfLoadingBar">
                    <p className="loadingBar">Work to be done</p>

                    <div className="loadingBarDiv">
                        <div style={{width: (this.state.loadingBarCount + '%')}} className="loadingPart"></div>
                    </div>

                </div>


            </div>
        )
    }
}

export default Home