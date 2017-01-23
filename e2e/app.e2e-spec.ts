import { HymndbClientPage } from './app.po';

describe('hymndb-client App', function() {
  let page: HymndbClientPage;

  beforeEach(() => {
    page = new HymndbClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
