import Info from './components/Info.vue';

const Stocks = resolve => {
    require.ensure(['./components/Stocks.vue'], () => {
        resolve(require('./components/Stocks.vue'))
    });
    
}

const Portfolio = resolve => {
    require.ensure(['./components/Portfolio.vue'], () => {
        resolve(require('./components/Portfolio.vue'))
    });
    
}

export const routes = [
    {path: '', name: 'home', component: Info},
    {path: '/stocks', name: 'stocks', component: Stocks},
    {path: '/portfolio', name: 'portfolio', component: Portfolio}
]