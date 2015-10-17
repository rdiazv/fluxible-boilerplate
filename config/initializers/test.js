const testsContext = require.context('../../test', true, /_spec\.jsx?$/);
const srcContext = require.context('../../app', true, /\.jsx?$/);

testsContext.keys().forEach(testsContext);
srcContext.keys().forEach(srcContext);
