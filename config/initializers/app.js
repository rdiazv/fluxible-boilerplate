import Fluxible from 'fluxible';
import Application from '../../app/components/Application';
import ApplicationStore from '../../app/stores/ApplicationStore';
import RouteStore from '../../app/stores/RouteStore';
import TranslationsStore from '../../app/stores/TranslationsStore';
import fuxibleEnvPlugin from '../../app/fluxible-plugins/fluxible.env';

// create new fluxible instance
const app = new Fluxible({
  component: Application
});

app.plug(fuxibleEnvPlugin);

// register stores
app.registerStore(RouteStore);
app.registerStore(ApplicationStore);
app.registerStore(TranslationsStore);

module.exports = app;
