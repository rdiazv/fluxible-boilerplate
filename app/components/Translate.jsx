import React from 'react';
import counterpart from 'counterpart';
import TranslationsStore from '../stores/TranslationsStore';
import { connectToStores } from 'fluxible-addons-react';

class Translate extends React.Component {
  static propTypes = {
    content: React.PropTypes.string.isRequired,
    component: React.PropTypes.string
  }

  static defaultProps = {
    component: 'span'
  }

  render() {
    return (
      <this.props.component>
        {counterpart(this.props.content)}
      </this.props.component>
    );
  }
};

export default connectToStores(Translate, [TranslationsStore], (context, props) => {
  return {};
});
