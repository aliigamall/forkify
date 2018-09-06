import { elements } from './base';

export const getValue = () => elements.searchInput.value;

export const clearSearchRes = () => {
    elements.searchResList.innerHTML = '';
    elements.searchPage.innerHTML = '';
};

export const clearSearchInput = () => {
    elements.searchInput.value = '';
};

const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const newTitle = [];
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="${recipe.recipe_id}" title="${recipe.title}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title, 17)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

const createButton = (currPage, direction) => `
    <button class="btn-inline results__btn--${direction}" data-goto="${direction === 'prev' ? currPage - 1 : currPage + 1}">
        <span>Page ${direction === 'prev' ? currPage - 1 : currPage + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${direction === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;


const renderButtons = (currPage, itemsNum, itemsPerPage) => {
    const pagesNumber = Math.ceil(itemsNum / itemsPerPage);
    let button;

    if (currPage === 1 && pagesNumber > 1) {
        // render next button
        button = createButton(currPage, 'next');
    } else if (currPage === pagesNumber && pagesNumber > 1) {
        // render prev button
        button = createButton(currPage, 'prev');
    } else if (currPage < pagesNumber) {
        // render both buttons
        button = `
            ${createButton(currPage, 'next')}
            ${createButton(currPage, 'prev')}
        `;
    }

    elements.searchPage.insertAdjacentHTML('afterbegin', button);

}

export const renderResult = (recipes, currPage = 1, itemsPerPage = 10) => {
    // render result of current page
    const start = (currPage - 1) * 10;
    const end = currPage * itemsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination
    renderButtons(currPage, recipes.length, itemsPerPage);
}
