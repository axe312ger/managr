export function loadFiles () {
  return window
    .fetch('http://localhost:1338/tree/%2F')
    .then((response) => response.json())
    .then((response) => {
      console.log('yes sir', response)
      return response
    })
    .catch((ex) => console.log('parsing failed', ex))
}
