const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

/* Put code here */

/* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('https://owlsalex.github.io/PWAPRO/sw.js').then(function(registration) {
        // Registration was successful
        console.log('Registro de ServiceWorker exitoso con alcance: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('El registro de ServiceWorker falló: ', err);
      });
    });
  }


/*window.addEventListener("beforeinstallprompt", event => {
  console.log("👍", "beforeinstallprompt", event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle("hidden", false);
});*/

window.addEventListener("beforeinstallprompt", function(e) { 
  // log the platforms provided as options in an install prompt 
  console.log(e.platforms); // e.g., ["web", "android", "windows"] 
  e.userChoice.then(function(choiceResult) { 
    console.log(choiceResult.outcome); // either "accepted" or "dismissed"
  }, handleError); 
});

butInstall.addEventListener("click", () => {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    console.log("No se puede instalar");
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then(result => {
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle("hidden", true);
  });
});

window.addEventListener("appinstalled", event => {
  console.log("👍", "appinstalled", event);
});

