import { webLink } from "../App";
import React from "react";
import { useParams ,useSearchParams} from "react-router-dom";




     
class Event extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        regs: []
        
      };
    }
    
   
   
    componentDidMount() {
        
        const queryParams = new URLSearchParams(window.location.search);
        const slug = queryParams.get('slug');

      fetch(webLink+"events/"+slug)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              evId: result.id,
              evName: result.name,
              evDesc: result.description,
              regs: result.registrations
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
      const { error, isLoaded, regs, evDesc, evName } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className="eventPage">
              <div className="eventInfo">
                  <h2>{evName}</h2>
                  <h3>{evDesc}</h3>
              </div>
              <div>
                {regs.map(reg => (
                    <div className="eventRegis" key={reg.id}>
                        <h3>{reg.name}</h3>
                        <p>{reg.comment}</p>
                    </div>
            ))}
          </div>
          </div>
        );
      }
    }
  }

export default Event;
