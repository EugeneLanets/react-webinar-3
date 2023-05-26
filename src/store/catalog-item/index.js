import StoreModule from '../module';

class CatalogItem extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      _id: '1',
      title: 'Название товара',
      description: 'Описание товара',
      country: {
        title: 'Страна',
        code: 'CO',
      },
      category: 'Категория',
      edition: 2023,
      price: 1,
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
}

export default CatalogItem;
