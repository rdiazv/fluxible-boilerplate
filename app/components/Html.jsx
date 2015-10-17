import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import requireImage from '../lib/requireImage';

class Html extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />

          <link rel="shortcut icon" type="images/png" size="32x32"
            href={requireImage('favicon.png')}
            />

          {Object.keys(this.props.assets.styles).map((key, index) =>
            <link href={this.props.assets.styles[key]}
              key={key}
              media="all"
              rel="stylesheet"
              type="text/css"
              />)}

        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.markup }}></div>

          <script dangerouslySetInnerHTML={{ __html: this.props.state }}></script>
          <script src={this.props.assets.javascript.vendors} />
          <script src={this.props.assets.javascript.main} />
        </body>
      </html>
    );
  }
}

export default Html;
