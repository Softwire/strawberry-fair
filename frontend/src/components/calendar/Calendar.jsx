import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import CalendarDay from './CalendarDay'

class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {view: 'month', dateToday: props.dateToday}  // View is 'month' or 'year'
        // TODO: Could always make this update state.dateToday every second to make sure it always displays the correct one
    }

    toMonthView() {
        this.setState({view: 'month'})
    }

    toYearView() {
        this.setState({view: 'year'})
    }

    render() {
        const days = [...Array(31).keys()].map(n => n + 1)
        // Changing it to use Bulma
        // TODO: Figure out how to get this to work with screenreaders
        // What would the corect semantic component for this be?
        // TODO: Get font-awesome icons actually working
        return (
            <div className="panel">
                <p className="panel-heading">{this.props.title}</p>
                <p className="panel-tabs">
                    <a href="/calendar" className="is-active">Month</a>
                    <a href="/calendar">Year</a>
                </p>
                <div className="panel-block">
                    <div className="columns is-vcentered is-centered">
                        <div className="column is-narrow">
                            <button className="button is-white">
                                <span className="icon is-left has-text-dark">
                                    <FaChevronLeft />
                                </span>
                            </button>
                        </div>
                        <div className="column">
                            <p>{new Date(this.state.dateToday).toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})}</p>
                        </div>
                        <div className="column is-narrow">
                            <button className="button is-white">
                                <span className="icon is-right has-text-dark">
                                    <FaChevronRight />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel-block">
                    <div className="columns is-multiline is-mobile">
                        {days.map(dayNumber => <CalendarDay key={dayNumber} dayNumber={dayNumber} dateToday={this.state.dateToday} />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
