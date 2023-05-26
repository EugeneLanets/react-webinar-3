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

  async load(id) {
    const baseUrl = '/api/v1/articles';

    const url = `${baseUrl}/${id}?fields=*,madeIn(title,code),category(title)`;

    const response = await fetch(url);
    const json = await response.json();
    const { _id, title, description, madeIn, edition, category, price } =
      json.result;

    this.setState(
      {
        _id,
        title,
        description,
        country: {
          title: madeIn.title,
          code: madeIn.code,
        },
        category: category.title,
        edition,
        price,
      },
      `Загружен товар ID=${id} из АПИ`
    );
  }
}

export default CatalogItem;
