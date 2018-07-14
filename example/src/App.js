import React, {Component} from 'react';
import './App.css';
import {Image, Picture} from 'pixboost-react';

class App extends Component {
    render() {
        const pixboostConfig = {
            apiKey: 'MTg4MjMxMzM3MA__',
            domain: 'pixboost.com',
            breakpoints: {
                lg: {media: '(min-width: 990px)'},
                md: {media: '(min-width: 640px)'},
                sm: {}
            }
        };
        return (
            <div className="App">
                <div className={'ImagesWrapper'}>
                    <Image src={'https://cdn.pixabay.com/photo/2017/06/05/14/55/glass-2374311__340.jpg'}
                           alt={'glass'}
                           lazy={false}
                           op={'fit?size=600x400'}
                           config={pixboostConfig}
                    />
                    <Picture breakpoints={
                        {
                            lg: {
                                src: 'https://cdn.pixabay.com/photo/2018/03/01/09/33/laptop-3190194_960_720.jpg',
                                op: 'fit?size=600x400'
                            },
                            md: {
                                src: 'https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg',
                                op: 'fit?size=300x300'
                            },
                            sm: {hide: true}
                        }
                    } config={pixboostConfig}/>
                </div>
                <div className={'Spacer'}>
                    Scroll down to see lazy images<br/>
                    <span style={{fontSize: 60}}>⇩</span>
                </div>
                <div className={'ImagesWrapper'}>
                    <div>
                        <Image src={'https://cdn.pixabay.com/photo/2016/05/10/15/29/bear-1383980_960_720.jpg'}
                               alt={'lazy bear'}
                               config={pixboostConfig}
                               op={'resize?size=200'}
                        />
                    </div>
                    <Picture alt={"lazy picture"} breakpoints={
                        {
                            lg: {
                                src: 'https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_960_720.jpg',
                                op: 'resize?size=600'
                            },
                            md: {
                                src: 'https://cdn.pixabay.com/photo/2015/02/02/15/28/bar-621033_960_720.jpg',
                                op: 'fit?size=300x300'
                            },
                            sm: {
                                src: 'https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723__340.jpg',
                                op: 'resize?size=200'
                            }
                        }
                    } config={pixboostConfig}/>
                </div>
            </div>
        );
    }
}

export default App;
