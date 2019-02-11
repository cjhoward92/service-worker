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