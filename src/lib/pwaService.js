class PwaService {
  constructor() {
    this.isInstalled = false;
    this.deferredPrompt = null;
  }

  init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstalled = false;
      console.log('PWA install prompt saved');
    });

    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
      console.log('PWA installed');
    });
  }

  async promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const choiceResult = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      return choiceResult.outcome;
    }
    return null;
  }
}

const pwaService = new PwaService();
export default pwaService;
