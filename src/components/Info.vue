<template>
  <div class="jumbotron" style="background-color: white; border: 1px solid rgba(0,0,0,.1)">
      <h1>Trade or View Your Portfolio</h1>
      <p>You may load and save your data</p>
      <p>Click on 'End Day' to begin a new day and see whether your stocks have increased or decreased in value.</p>
      <hr>
      <h3>Your Funds: ${{getFunds}}</h3>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getFunds"
    ])
  }
}
</script>

<style>

</style>