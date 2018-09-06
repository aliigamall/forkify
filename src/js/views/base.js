export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchPage: document.querySelector('.results__pages'),
}

const elemntString = {
    loaderClass: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elemntString.loaderClass}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const removeLoader = () => {
    const loader = document.querySelector(`.${elemntString.loaderClass}`);
    if(loader) loader.parentElement.removeChild(loader)
}