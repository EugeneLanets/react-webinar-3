import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalPages: 1,
    };
  }

  async load() {
    const baseUrl = '/api/v1/articles';
    const { currentPage, itemsPerPage } = this.getState();
    const url = `${baseUrl}?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }&fields=items(_id,title,price),count`;

    const response = await fetch(url);
    const json = await response.json();
    const { items, count } = json.result;
    const totalPages = Math.ceil(count / itemsPerPage);

    this.setState(
      {
        ...this.getState(),
        list: items,
        totalPages,
      },
      'Загружены товары из АПИ'
    );
  }

  setCurrentPage(page) {
    console.log('here');
    this.setState({
      ...this.getState(),
      currentPage: page,
    });
  }
}

export default Catalog;