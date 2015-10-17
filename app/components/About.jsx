import React from 'react';
import Translate from './Translate';

class About extends React.Component {
  render() {
    return (
      <div>
        <Translate content="aboutScope.title" component="h1" />
        <Translate content="aboutScope.description" component="p" />
      </div>
    );
  }
}

export default About;
