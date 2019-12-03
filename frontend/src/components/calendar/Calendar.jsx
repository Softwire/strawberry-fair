import React from 'react'
import { Link } from 'gatsby'
import CalendarDay from './CalendarDay'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {view: 'month'};  // View is 'month' or 'year'
    }

    toMonthView() {
        console.log('To month view');
        this.setState({view: 'month'});
    }

    toYearView() {
        console.log('To year view');
        this.setState({view: 'year'});
    }

    render() {
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
    }
}

export default Calendar
