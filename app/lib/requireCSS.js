export default function requireCSS(path) {
  if (process.env.BROWSER) {
    require(`../../client/styles/${path}`);
  }
}
