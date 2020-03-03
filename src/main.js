import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes'
import { store } from './store/store'
import VueResource from 'vue-resource';

Vue.use(VueRouter);
Vue.use(VueResource)

Vue.http.options.root = "https://vue-stocks-a6ed5.firebaseio.com/";



Vue.http.put("https://vue-stocks-a6ed5.firebaseio.com/stocks.json", store.getters.getStocks)
  .then(response => {
      console.log(response, 'Successfully initialized stocks')
  }, error => {
      console.log(error, 'Did not successfully initialize stocks')
  })
  .then(() => {
    store.dispatch('getStocksAction')
  })

Vue.http.put("https://vue-stocks-a6ed5.firebaseio.com/funds.json", store.getters.getFunds)
  .then(response => {
    console.log(response, 'Successfully initialized funds')
  }, error => {
    console.log(error, 'Did not successfully initialize funds')
  })
  .then(() => {
  store.dispatch('getFundsAction')
  })

Vue.http.delete("https://vue-stocks-a6ed5.firebaseio.com/portfolio.json")
  .then(response => {
    console.log(response, "Successfully cleared portfolio");
  }, error => {
    console.log(error, "Did not successfully clear portfolio");
  })
  .then(()=>{
    store.dispatch('getPortfolioAction')
  })



const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})