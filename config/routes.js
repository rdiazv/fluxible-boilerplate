export default {
  home: {
    path: '/',
    method: 'get',
    page: 'home',
    title: 'Home',
    handler: require('../app/components/Home')
  },
  about: {
    path: '/about',
    method: 'get',
    page: 'about',
    title: 'About',
    handler: require('../app/components/About')
  }
};
