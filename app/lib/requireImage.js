import isAbsoluteUrl from 'is-absolute-url';

export default function requireImage(image) {
  if (isAbsoluteUrl(image)) {
    return image;
  }
  else {
    return require(`../../client/images/${image}`);
  }
}
