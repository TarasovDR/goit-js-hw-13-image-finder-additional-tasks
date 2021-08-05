import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '21723163-ca21d56557a4a0bebd6e19c52';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      language: 'en',
      per_page: 12,
    });
    const url = `&page=${this.page}&key=${API_KEY}&${searchParams}`;
    return await axios.get(url).then(response => response.data.hits);
    console.log(response);
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
