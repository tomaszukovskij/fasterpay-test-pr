<template>
  <div class="container">
    <transition name="slide" mode="out-in">
      <div v-if="!$store.state.paymentSuccessful">
        <country-selector></country-selector>
        <payment-selector></payment-selector>
        <payment-form v-if="$store.state.paymentMethodSelected"></payment-form>
      </div>
      <payment-success v-else></payment-success>
    </transition>
  </div>
</template>

<script>
import PaymentSelector from "./components/views/PaymentSelector";
import CountrySelector from "./components/views/CountrySelector";
import PaymentForm from "./components/views/PaymentForm";
import PaymentSuccess from "./components/views/PaymentSuccess";
export default {
  components: {
    PaymentSelector,
    CountrySelector,
    PaymentForm,
    PaymentSuccess,
  },
  created() {
    // Fetching data from API
    this.$store.dispatch("fetchDataFromApi");
  },
};
</script>

<style lang="scss">
body {
  margin: 0 15px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 20px;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  font-size: 16px;
  margin-bottom: 20px;
}

section {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 50px;
  }
}

.slide-enter-active {
  animation: slideUp 0.5s ease;
}

.slide-leave-active {
  animation: slideUp 0.5s ease reverse;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
