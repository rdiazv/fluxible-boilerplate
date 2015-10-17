import React from 'react';
import Translate from './Translate';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Translate content="homeScope.title" component="h1" />
        <Translate content="homeScope.description" component="p" />
      </div>
    );
  }
}

export default Home;
