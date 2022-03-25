import { webLink } from "../App";
import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";

class Events extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    componentDidMount() {
      fetch(webLink+"events")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className="eventsList">
            {items.map(item => (
              <div class="eventSumm" key={item.id}>
                <Link to={'/events/slug=' + item.slug}>{item.name}</Link>
                <p class="events__eventDescription">{item.description}</p>
                <p class="date">{Moment(item.created).format('d MMM YYYY')}</p>
              </div>
            ))}
          </div>
        );
      }
    }
  }

export default Events;