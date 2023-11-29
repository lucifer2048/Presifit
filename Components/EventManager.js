import React, { Component } from 'react';

class EventManager extends Component {
 constructor(props) {
    super(props);

    this.state = {
      eventDates: [],
      inputField: '',
    };
 }

 handleInputChange = (event) => {
    this.setState({ inputField: event.target.value });
 }

 handleAddEvent = () => {
    if (this.state.inputField === '') {
      alert('Please enter a date');
      return;
    }

    const newEventDates = [...this.state.eventDates, this.state.inputField];
    this.setState({ eventDates: newEventDates, inputField: '' });
 }

 render() {
    return (
      <div>
        <input type="text" value={this.state.inputField} onChange={this.handleInputChange} />
        <button onClick={this.handleAddEvent}>Add Event</button>
        <ul>
          {this.state.eventDates.map((date, index) => <li key={index}>{date}</li>)}
        </ul>
      </div>
    );
 }
}

export default EventManager;