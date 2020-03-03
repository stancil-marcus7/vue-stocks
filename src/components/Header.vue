<template>
  <div>
    <br><br>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="border: 1px solid rgba(0,0,0,.1); border-radius: .3rem">
    <router-link to="/"><a class="navbar-brand">Stock Trader</a></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
          <router-link to="/portfolio" active-class="active" tag="li" class="nav-item">
              <a class="nav-link">Portfolio</a>
          </router-link>
          <router-link active-class="active" to="/stocks" tag="li" class="nav-item">
              <a class="nav-link">Stocks</a>
          </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li  class="nav-item" style="cursor: pointer" active-class="active"><a @click="endDayAction" class="nav-link">End Day</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Save & Load
          </a>
          <div style="cursor: pointer" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a @click="savePortfolioAction" class="dropdown-item" >Save</a>
            <a @click="loadPortfolioAction" class="dropdown-item" >Load</a>
          </div>
        </li>
        <li class="nav-item nav-link">Funds: ${{funds}}</li>
      </ul>
    </div>
  </nav>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {mapActions} from 'vuex';
export default {
  data(){
    return{
      newSave: {}
    }
  },
  methods:{
    ...mapActions([
      'loadPortfolioAction',
      'savePortfolioAction',
      'endDayAction'
    ]),
    save(stocks, portfolio){
      let thisSave = {
        stocks,
        portfolio
      }

      this.newSave = {...thisSave}
      console.log(this.newSave)
    },
  },
  computed: { 
            ...mapGetters({
              funds: 'getFunds',
            }),
        },
};
</script>

<style>

.nav-item.nav-link:last-child{
  font-weight: 700;
  pointer-events: none;
}

.nav-item.nav-link:last-child:hover{
  text-decoration: none;
}

</style>