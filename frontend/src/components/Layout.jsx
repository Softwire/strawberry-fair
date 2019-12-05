import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, hero}) => {
    const banner = hero ? <Hero data={Object.values(hero)} /> : null
    
    return (
        <div className="container">
            <Header />
            {banner}
            <main>{children}</main>
            <Footer />
        </div>
    )
}

/*
export class Hero extends React.Component {
    constructor(props) {
        super(props)
        this.imageSet = Object.values(props.data).map(({src, alt}) => <PreviewCompatibleImage imageInfo={{image: {src}, alt: {alt}}} />)
        this.numImages = this.imageSet.length
        this.state = {imageNo: 0}
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.change(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    change() {
        this.setState({imageNo: (this.state.imageNo + 1) % this.numImages})
    }

    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <figure className="image">
                        {this.imageSet[this.state]}
                    </figure>
                </div>
            </section>
        )
    }
}
*/

export const Hero = ({data}) => {

    const [imageNum, setImageNum] = useState(0)
    const [imageInfo, setImageInfo] = useState(data[0])

    useEffect(() => {
        setTimeout(() => {
            setImageNum((imageNum + 1) % 5)
            setImageInfo(data[imageNum])
        }, 1000)
    })

    console.log(imageInfo)

    return (
        <FixedHero info={imageInfo} />
    )
}


export const FixedHero = ({info: {src, alt}}) => (
    <section className="hero">
        <div className="hero-body">
            <figure className="image">
                <PreviewCompatibleImage imageInfo={{image: src, alt: alt}} />
            </figure>
        </div>
    </section>
)