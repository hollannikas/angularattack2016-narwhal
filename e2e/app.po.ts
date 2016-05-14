export class NgSarvivalasPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng-sarvivalas-app h1')).getText();
  }
}
