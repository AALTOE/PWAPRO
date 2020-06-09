if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('Registro de ServiceWorker exitoso con alcance: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('El registro de ServiceWorker falló: ', err);
      });
    });
  }

  const divInstall = document.getElementById('installContainer');
  const butInstall = document.getElementById('butInstall');

  window.addEventListener('beforeinstallprompt', (event) => {
    console.log('👍', 'beforeinstallprompt', event);
    // Stash the event so it can be triggered later.
    window.deferredPrompt = event;
    // Remove the 'hidden' class from the install button container
    divInstall.classList.toggle('hidden', false);
  });

  butInstall.addEventListener('click', () => {
    console.log('👍', 'Botón de instalacion precionado');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then((result) => {
      console.log('👍', 'Elección del usuario', result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      divInstall.classList.toggle('hidden', true);
    });
  });

  window.addEventListener('appinstalled', (event) => {
    console.log('👍', 'App instalada', event);
  });
  
