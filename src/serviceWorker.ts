// serviceWorker.ts

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] é o endereço de loopback do IPv6.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 é considerado local para fins de hospedagem.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config?: { onUpdate?: (registration: ServiceWorkerRegistration) => void }) {
    if ('serviceWorker' in navigator) {
      // O registro de service workers é seguro e não causa problemas em navegadores que não o suportam.
      navigator.serviceWorker.register('service-worker.js').then(
        function(registration) {
          console.log('Service Worker registrado com sucesso:', registration);
  
          if (config && config.onUpdate) {
            config.onUpdate(registration);
          }
        },
        function(error) {
          console.error('Erro ao registrar o Service Worker:', error);
        }
      );
    }
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.unregister();
      });
    }
  }
  
  // Essa verificação é necessária para verificar se o aplicativo está sendo executado no localhost ou em um domínio de produção.
  // Serve para evitar problemas com solicitações de service worker que não são seguras em um ambiente de produção.
  if (isLocalhost) {
    // Imediatamente registre o service worker
    register();
  }
  