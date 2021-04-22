<template>
  <section class="payments">
    <h2>Choose payment type</h2>
    <div class="payments__wrap">
      <payment-item
        v-for="(paymentMethod, index) in getPaymentMethods"
        :key="paymentMethod.id"
        :item="paymentMethod"
        @click="selectPaymentMethod(index, paymentMethod.id)"
        :class="{ active: $store.state.paymentMethodSelected.index === index }"
      ></payment-item>
    </div>
  </section>
</template>
<script>
import PaymentItem from "../payment/PaymentItem";
export default {
  components: {
    PaymentItem,
  },
  emits: ["paymentMethodSelected"],
  computed: {
    getPaymentMethods() {
      return this.$store.state.paymentMethods;
    },
  },
  methods: {
    selectPaymentMethod(index, id) {
      // send selected payment method to store
      const selectedPaymentMethod = {
        id: id,
        index: index,
        status: true,
      };
      this.$store.dispatch("isPaymentMethodSelected", selectedPaymentMethod);
    },
  },
};
</script>
<style lang="scss">
.payments__wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  @media all and (min-width: 600px) {
    justify-content: flex-start;
  }
}
</style>
