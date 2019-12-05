import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import '../styling/styles.sass'


/* All page templates should be wrapped in the Layout component to provide common styling */

export const Layout = ({children, hero}) => (
    <div className="container">
        <Header />
        <Hero data={hero} />
        <main>{children}</main>
        <Footer />
    </div>
)


export class Hero extends React.Component {
    constructor(props) {
        super(props)
        this.imageSet = Object.values(props.hero).map(({src, alt}) => <PreviewCompatibleImage imageInfo={{image: {src}, alt: {alt}}} />) // what about null images though?
        this.numImages = imageSet.length
        this.state = 0
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
        this.setState((this.state + 1) % this.numImages)
    }

    render() {
        return (
            <section class="hero">
                <div class="hero-body">
                    <figure class="image">
                        {this.imageSet[this.state]}
                    </figure>
                </div>
            </section>
        )
    }
}