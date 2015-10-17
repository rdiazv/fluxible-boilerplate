export default {
  name: 'env',

  plugContext: (options, context, app) => {
    let env = options.env;

    return {
      plugComponentContext: (componentContext, context, app) => {
        componentContext.env = env;
      },

      plugActionContext: (actionContext, context, app) => {
        actionContext.env = env;
      },

      dehydrate: () => {
        return { env };
      },

      rehydrate: (state) => {
        env = state.env;
      }
    };
  }
}
