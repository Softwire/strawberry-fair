import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import CalendarDay from './CalendarDay'

class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {view: 'month', focusDate: props.focusDate}  // View is 'month' or 'year'
        // TODO: Could always make this update state.dateToday every second to make sure it always displays the correct one
        // Although, actually, wouldn't that be an update within CalendarDay rather than here?

        // Bind functions
        this.monthForward = this.monthForward.bind(this)
        this.monthBack = this.monthBack.bind(this)
        this.monthChange = this.monthChange.bind(this)
    }

    toMonthView() {
        this.setState({view: 'month'})
    }

    toYearView() {
        this.setState({view: 'year'})
    }

    monthForward() {
        this.monthChange(1)
    }

    monthChange(n) {
        // Get current month
        let newDate = new Date(this.state.focusDate)
        const month = newDate.getMonth()
        newDate.setMonth(month + n)

        // Set focus to new date
        this.setState({focusDate: newDate.toISOString()})
    }

    monthBack() {
        this.monthChange(-1)
    }

    render() {
        // Calculate the number of days in the given month (focusDate.getMonth())
        const focusDate = new Date(this.state.focusDate)
        const monthDate = new Date(focusDate.getFullYear(), focusDate.getMonth() + 1, 0)
        const daysInFocusMonth = monthDate.getDate()

        const days = [...Array(daysInFocusMonth).keys()].map(n => n + 1)
        // TODO: Figure out how to get this to work with screenreaders
        // What would the corect semantic component for this be?
        // TODO: See https://codepen.io/wikiki/pen/KvqKzK for a way of making the "< December 2019 >" bit span across the whole calendar
        return (
            <div className="panel">
                <p className="panel-heading">{this.props.title}</p>
                <div className="panel-block">
                    <div className="container">
                        <div className="tabs is-centered is-fullwidth">
                            <ul>
                                <li><a href="/calendar" className="is-active">Month</a></li>
                                <li><a href="/calendar">Year</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="columns is-vcentered is-centered">
                            <div className="column is-narrow">
                                <button onClick={this.monthBack} className="button is-white">
                                    <span className="icon is-left has-text-dark">
                                        <FaChevronLeft />
                                    </span>
                                </button>
                            </div>
                            <div className="column">
                                <p>{new Date(this.state.focusDate).toLocaleDateString('en-GB', {month: 'long', year: 'numeric'})}</p>
                            </div>
                            <div className="column is-narrow">
                                <button onClick={this.monthForward} className="button is-white">
                                    <span className="icon is-right has-text-dark">
                                        <FaChevronRight />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-block">
                    <div className="columns is-multiline is-mobile">
                        {days.map(dayNumber => <CalendarDay
                            key={dayNumber}
                            dateTime={new Date(focusDate.getFullYear(), focusDate.getMonth(), dayNumber)}
                            events={this.props.events}
                        />)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Calendar
