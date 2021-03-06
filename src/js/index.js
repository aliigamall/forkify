import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, removeLoader } from './views/base';


/** Globale State of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

const state = {};

const controllerSearch = async () => {
    // 1) Get query from view
    const query = searchView.getValue();
    if (query) {
        // 2) New Search object and add it to the state
        state.search = new Search(query);

        // 3) prepare UI for results
        renderLoader(elements.searchRes);
        searchView.clearSearchInput();
        searchView.clearSearchRes();

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        removeLoader();
        searchView.renderResult(state.search.recipes);
    }
}

elements.searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    controllerSearch();
});

elements.searchPage.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearSearchRes();
        searchView.renderResult(state.search.recipes, goToPage);
    }
});