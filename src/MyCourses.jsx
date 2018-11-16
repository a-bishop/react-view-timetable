import React, { Component } from 'react';
import Title from './Title';
import TableData from './TableData';
import './MyCourses.css';

class MyCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      display: {},
      color: {}
    };

    this.onTableMouseOver = this.onTableMouseOver.bind(this);
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/a-bishop/timetable-server/Courses')
    .then(response=> this.handleHTTPErrors(response))
    .then(response=> response.json())
    .then(result=> {
      this.setState({
        courses: result,
        display: {},
        color: {}
      });
      this.state.courses.forEach((course) => {
          let hash = this.hashCode(course.Course);
          let color = this.colorGenerator(hash);
          let courseId = course.ID;
          this.setState({
            color: {...this.state.color, [courseId]: color}
          })
      });
    })
    .catch(error=> {
      console.log(error);
    });
  }

  handleHTTPErrors = (response) => {
    if (!response.ok) throw Error(response.status +
      ': ' + response.statusText);
    return response;
  }

  onTableMouseOver = (id) => {
    const thisDisplay = this.state.courses
      .filter(course => course.ID === id)[0].ID;
    this.setState({
      display: thisDisplay
    })
  }

  onTableMouseLeave = () => {
    this.setState({
      display: {}
    })
  }

  hashCode = (string) => {
    if (string.length === 0) return 0;
    let chrs = 0;
    for (let i = 1; i < string.length; i++) {
      let chr = string.charCodeAt(i);
      chrs += chr;
    }
    chrs = chrs * string.length;
    return chrs % 255;
  };

  colorGenerator = (num) => {
    let rgb = [];
    let r = (num * 13) % 255; 
    let g = (num * 9) % 255; 
    rgb.push(r);
    rgb.push(g);
    rgb.push(num);
    for (let [index, color] of rgb.entries()) {
      if (color < 75) {
        color += 50;
      }
      rgb[index] = color;
    }
    return rgb.join();
  }

  render() {
    return (
      <div className='myCourses'>
          <Title />
            <div className='timetable'>
            <section className='timeWrapper'>
              <div>8:30</div>
              <div>9:00</div>
              <div>9:30</div>
              <div>10:00</div>
              <div>10:30</div>
              <div>11:00</div>
              <div>11:30</div>
              <div>12:00</div>
              <div>12:30</div>
              <div>1:00</div>
              <div>1:30</div>
              <div>2:00</div>
              <div>2:30</div>
              <div>3:00</div>
              <div>3:30</div>
              <div>4:00</div>
              <div>4:30</div>
              <div>5:00</div>
              <div>5:30</div>
              <div>6:00</div>
            </section>
              <section className='titleWrapper'>
                <p className='timeColumn'>TIME</p>
                <p className='monday'>MONDAY</p>
                <p className='tuesday'>TUESDAY</p>
                <p className='wednesday'>WEDNESDAY</p>
                <p className='thursday'>THURSDAY</p>
                <p className='friday'>FRIDAY</p>
              </section>
            {this.state.courses.map( course => 
              <TableData 
                key={course.ID} 
                id={course.ID}
                color={this.state.color[course.ID]} 
                course={course.Course}
                type={course.Type} 
                day={course.Day} 
                startTime={course.StartTime} 
                endTime={course.EndTime}  
                room={course.Room}
                onMouseOver={() => this.onTableMouseOver(course.ID)}
                onMouseLeave={this.onTableMouseLeave}
                display={this.state.display}
              />
            )} 
          </div>          
        </div>
    )
  }
}

export default MyCourses;