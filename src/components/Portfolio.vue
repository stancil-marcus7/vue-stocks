<template>
  <div class="portfolio-empty" v-if="portfolio.length===0">
    Your portfolio is empty
  </div>
  <div v-else>
  <div v-if="loading === true">
    <vue-circle></vue-circle>
  </div>
  <div v-else>
  <div class="container-fluid">
    <div class="row">
      <div v-for="(investment, stockIndex) in portfolio" class="col-lg-6" :key="stockIndex">
        <div class="card" v-if="investment.quantity > 0">
          <div class="card-header">
            <h1>
              {{investment.stock.name}}
              <span>(Price: ${{stockPrice(investment.stock.name)}} | Quantity: {{investment.quantity}})</span>
            </h1>
          </div>
          <div class="card-body">
            <form action>
              <input
                type="number"
                class="form-control"
                placeholder="Quantity"
                v-model.number="stockQuantity[stockIndex]"
              />
            </form>
            <button
              :style="{cursor: cursor(stockQuantity[stockIndex])}"
              :disabled="!button(stockQuantity[stockIndex])"
              @click="removeFromPortfolio(investment, stockQuantity[stockIndex])"
              class="btn btn-danger"
            >Sell</button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import VueCircle from 'vue-loading-spinner/src/components/Circle.vue';
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  components:{
    VueCircle
  },
  data() {
    return {
      stockQuantity: []
    };
  },
  methods: {
    ...mapActions(["removePortfolioAction"]),
    removeFromPortfolio(stock, quantity) {
      if (quantity === undefined || quantity < 0) {
        alert("Please insert an appropriate value");
      } else {
        const soldStock = {
          stock,
          quantity
        };
        this.$store.dispatch("removePortfolioAction", soldStock);
      }
    }
  },
  computed: {
    ...mapGetters({
      portfolio: "getPortfolio",
      stockPrice: "getStockPrice",
      loading: "getPortfolioLoading"
    }),
    button: function() {
      return value => {
        return value > 0;
      };
    },
    cursor: function() {
      return value => {
        return value > 0 ? "pointer" : "not-allowed";
      };
    }
  }
};
</script>

<style scoped>
.card-body {
  display: flex;
  justify-content: space-between;
}

.card-header {
  background-color: #bbe1fa;
  color: #3282b8;
}

.portfolio-empty{
  text-align: center;
  
}

span {
  font-size: 1rem;
}
</style>
