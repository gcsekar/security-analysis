import { SecurityAnalysisPage } from './app.po';

describe('security-analysis App', () => {
  let page: SecurityAnalysisPage;

  beforeEach(() => {
    page = new SecurityAnalysisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
