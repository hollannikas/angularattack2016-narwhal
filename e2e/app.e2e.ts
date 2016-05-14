import { NgSarvivalasPage } from './app.po';

describe('ng-sarvivalas App', function() {
  let page: NgSarvivalasPage;

  beforeEach(() => {
    page = new NgSarvivalasPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-sarvivalas works!');
  });
});
