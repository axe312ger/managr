// This is causing a wrong url when hitting reload on a path including
// an escaped character. Can be fixed via:
// https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#custom-query-string-parsing
// but was unable to extend the browserHistory in main.js
// info: react-router escapes only the sub-delimiters and breaks with unescaped %
const reservedReactRouter = [
  ':', '/', '?', '#', '[', ']', '@', // RFC 3986 gen-delims
  // '!', '$', '&', '\'', '(', ')', '*', '+', ',', ';', '=', // RFC 3986 sub-delims
  '%' // % needs to be encoded to ensure proper decoding
]

function reactEncodeURIComponent (uri) {
  return Array.from(uri)
  .map((char) => reservedReactRouter.includes(char) ? encodeURIComponent(char) : char)
  .join('')
}

export function encodePath (path) {
  const encoded = path.map((name) => reactEncodeURIComponent(name))
  return [
    '/files',
    ...encoded
  ].join('/')
}

export function decodePath (pathString) {
  return pathString.split('/').slice(2).map((name) => decodeURI(name))
}
