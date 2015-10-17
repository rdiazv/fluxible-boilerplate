/*globals document*/

import React from 'react';
import Nav from './Nav';
import ApplicationStore from '../stores/ApplicationStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory } from 'fluxible-router';
import requireImage from '../lib/requireImage';

class Application extends React.Component {
  static contextTypes = {
    env: React.PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pageTitle !== prevProps.pageTitle) {
      document.title = this.props.pageTitle;
    }
  }

  render() {
    const Handler = this.props.currentRoute.get('handler');

    return (
      <div>
        <img src={requireImage('logo.jpg')} height="40" width="40" alt="Logo" />

        <Nav selected={this.props.currentPageName} links={this.props.pages} />
        <Handler />
        <hr />
        <p>context.env.renderedOnServer: {this.context.env.renderedOnServer.toString()}</p>
      </div>
    );
  }
}

export default handleHistory(provideContext(connectToStores(Application, [ApplicationStore], (context, props) => {
  const appStore = context.getStore(ApplicationStore);

  return {
    currentPageName: appStore.getCurrentPageName(),
    pageTitle: appStore.getPageTitle(),
    pages: appStore.getPages()
  };
}), {
  env: React.PropTypes.object.isRequired
}));
