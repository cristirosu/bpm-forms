import { BpmFormsPage } from './app.po';

describe('bpm-forms App', () => {
  let page: BpmFormsPage;

  beforeEach(() => {
    page = new BpmFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
