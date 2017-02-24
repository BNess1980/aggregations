import { AggregationsPage } from './app.po';

describe('aggregations App', function() {
  let page: AggregationsPage;

  beforeEach(() => {
    page = new AggregationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
