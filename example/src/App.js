import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Picture} from 'pixboost-react';
import {Cups} from './Data';

class App extends Component {
    render() {
        const pixboostConfig = {
            apiKey: 'MTg4MjMxMzM3MA__',
            domain: 'pixboost.com',
            breakpoints: {
                lg: {media: '(min-width: 576px)'},
                sm: {}
            }
        };
        return (
            <div className="App">
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="/">Midday.Coffee</a>
                    <form className="form-inline search-form">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>

                <div className={'container'}>
                    <div className="jumbotron">
                        <div className="container text-center">
                            <h1 className="display-4">Find Your Coffee Cup</h1>
                            <p className="lead">We have them all in one place!</p>
                        </div>
                    </div>
                    <div className={'row'}>
                        {
                            Cups.map(c => {
                                return (
                                    <div className="col-md-4 col-lg-3 col-6">
                                        <div className="card">
                                            <div className="img-wrapper">
                                                <Picture className={'card-img-top'} data-alt={c.Name} breakpoints={{
                                                    lg: {
                                                        src: c.Image,
                                                        op: 'resize?size=x200'
                                                    },
                                                    sm: {
                                                        src: c.Image,
                                                        op: 'resize?size=x150'
                                                    }
                                                }} config={pixboostConfig}/>
                                            </div>
                                            <div className="card-body">
                                                <h5>{c.Name}</h5>
                                                <p className="card-text">{c.Price}</p>
                                                <a href="#/buy" className="btn btn-primary">Add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
