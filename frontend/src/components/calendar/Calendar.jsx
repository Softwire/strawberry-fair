import React from 'react'
import CalendarDay from './CalendarDay'

class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {view: 'month'}  // View is 'month' or 'year'
    }

    toMonthView() {
        this.setState({view: 'month'})
    }

    toYearView() {
        this.setState({view: 'year'})
    }

    render() {
        /*
        const days = [1, 2, 3, 4];

        if (this.state.view == 'month') {
            return (
                <div>
                    <button onClick={this.toMonthView}>Month view</button>
                    <button onClick={this.toYearView}>Year view</button>
                    <div>
                        {days.map(n => <CalendarDay dayNumber={n} />)}
                    </div>
                </div>
            );
        } else if (this.state.view == 'year') {
            return (
                <p>Year view</p>
            );
        }
        */

        const days = [...Array(31).keys()].map(n => n + 1)
        // Changing it to use Bulma
        // TODO: Figure out how to get this to work with screenreaders
        // What would the corect semantic component for this be?
        return (
            <div className="panel">
                <p className="panel-heading">{this.props.title}</p>
                <p className="panel-tabs">
                    <a href="/calendar" className="is-active">Month</a>
                    <a href="/calendar">Year</a>
                </p>
                <div className="panel-block">
                    <div className="columns is-multiline is-mobile">
                        {days.map(dayNumber => <CalendarDay dayNumber={dayNumber} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
