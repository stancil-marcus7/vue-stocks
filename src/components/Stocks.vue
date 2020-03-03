<template>
  <div v-if="loading">
    <vue-circle></vue-circle>
  </div>
  <div v-else>
    <div class="container-fluid">
    <div class="row">
      <div v-for="(stock, stockIndex) in stocks" :key="stockIndex" class="col-lg-6">
        <div class="card">
          <div class="card-header">
            <h1>
              {{stock.name}}
              <span>Price: ${{stock.price}}</span>
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
              @click="insertPortfolio(stock, stockQuantity[stockIndex])"
              class="btn btn-success"
            >Buy</button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import VueCircle from 'vue-loading-spinner/src/components/Circle.vue';
export default {
  components: {
    VueCircle
  },
  data() {
    return {
      stockQuantity: []
    };
  },
  methods: {
    ...mapActions(["insertPortfolioAction"]),
    insertPortfolio(stock, quantity) {
      const newStock = {
        stock,
        quantity,
        key: ""
      };
      this.$store.dispatch("insertPortfolioAction", newStock);
    }
  },
  computed: {
    ...mapGetters({
      stocks: "getStocks",
      loading: "getStocksLoading"
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
  background-color: #ccedd2;
  color: #28a745;
}

span {
  font-size: 1rem;
}
</style>