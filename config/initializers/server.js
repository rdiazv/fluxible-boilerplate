/**
* This leverages Express to create and run the http server.
* A Fluxible context is created and executes the navigateAction
* based on the URL. Once completed, the store state is dehydrated
* and the application is rendered via React.
*/

import express from 'express';
import useragent from 'express-useragent';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';
import serialize from 'serialize-javascript';
import { navigateAction } from 'fluxible-router';
import debugLib from 'debug';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import app from './app';
import HtmlComponent from '../../app/components/Html';
import { createElementWithContext } from 'fluxible-addons-react';
import * as TranslationsActions from '../../app/actions/TranslationsActions';

const htmlComponent = React.createFactory(HtmlComponent);
const env = process.env.NODE_ENV;
const debug = debugLib('fluxible-boilerplate');
const server = express();
const port = process.env.PORT || 3000;

server.use(compression());
server.use(bodyParser.json());
server.use(useragent.express());
server.use('/public', express.static(path.resolve('build')));

server.use((req, res, next) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const renderedOnServer = Boolean(req.useragent.isBot || (req.query.bot === 'true' && __DEVELOPMENT__));
  const context = app.createContext({
    env: {
      renderedOnServer
    }
  });
  const actionContext = context.getActionContext();

  actionContext.executeAction(TranslationsActions.setLocale, 'en');

  debug('Executing navigate action');

  actionContext.executeAction(navigateAction, {
    url: req.url
  }, (err) => {
    if (err) {
      if (err.statusCode && err.statusCode === 404) {
        next();
      } else {
        next(err);
      }

      return;
    }

    debug('Exposing context state');

    const exposed = `window.App = ${serialize(app.dehydrate(context))};`;
    const htmlData = {
      context: context.getComponentContext(),
      state: exposed,
      assets: webpackIsomorphicTools.assets()
    };

    if (renderedOnServer) {
      htmlData.markup = ReactDOMServer.renderToString(createElementWithContext(context));
    }

    debug('Rendering Application component into html');
    const html = ReactDOMServer.renderToStaticMarkup(htmlComponent(htmlData));

    debug('Sending markup');
    res.type('html');
    res.write(`<!DOCTYPE html>${html}`);
    res.end();
  });
});

server.listen(port);
console.log(`Application listening on port ${port}`);

export default server;
