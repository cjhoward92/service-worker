if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('Registration successful: ', registration.scope);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

setTimeout(() => {
  console.log('Starting image fetch');
  fetch('./Untitled.png', {
    method: 'GET'
  }).then(response => {
    return response.blob();
  })
  .then(blob => {
    console.log(blob.size, blob.type);
  })
  .catch((err) => {
    console.error('Error getting the PNG file', err.message);
  });
}, 5000);