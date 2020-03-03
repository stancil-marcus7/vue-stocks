import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        stocks: [
            {name: 'BMW', price: 11}, 
            {name: 'Google', price: 9}, 
            {name: 'Apple', price: 12}, 
            {name: 'Twitter', price: 7}],
        portfolio: [],
        load: {
            portfolio: [],
            stocks: []
        },
        funds: 1000,
        portfolioLoading: false,
        stocksLoading: false
    },
    actions,
    getters,
    mutations,
})