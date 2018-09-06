import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '2b90d0db6461392b2b9bca4bf1e361a3';
        try {
            const result = await axios(`${proxy}http://food2fork.com/api/search/?key=${key}&q=${this.query}`);
            this.recipes = result.data.recipes;
        } catch (error) {
            alert(`Oops!! there is an error: ${error}`)
        }
    }
}