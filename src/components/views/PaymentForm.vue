<template>
  <section>
    <form @submit.prevent="submitForm">
      <form-group
        :label="'Enter amount'"
        :errorStatus="amountError"
        :errorMsg="'Please enter amount'"
        :field="'amount'"
      ></form-group>
      <h2>FIll form</h2>
      <form-group
        :label="'Cardholder name'"
        :errorStatus="cardHolderNameError"
        :errorMsg="'Please enter cardholder name'"
        :field="'cardHolderName'"
      ></form-group>
      <form-group
        :label="'Card number'"
        :errorStatus="cardNumberError"
        :errorMsg="'Please enter card number'"
        :field="'cardNumber'"
      ></form-group>
      <div class="form-wrap">
        <form-group
          :label="'CVV'"
          :errorStatus="cvvError"
          :errorMsg="'Please enter CVV'"
          :field="'cvv'"
        ></form-group>
        <form-group
          :label="'Expiration date'"
          :errorStatus="expirationError"
          :errorMsg="'Please enter expiration date'"
          :field="'expiration'"
        ></form-group>
      </div>
      <button>{{ buttonText }}</button>
    </form>
  </section>
</template>
<script>
import FormGroup from "../form/FormGroup";
export default {
  components: {
    FormGroup,
  },
  data() {
    return {
      amountError: null,
      cardHolderNameError: null,
      cardNumberError: null,
      cvvError: null,
      expirationError: null,
    };
  },
  computed: {
    buttonText() {
      return (
        "Pay " +
        this.$store.state.form.amount +
        " " +
        this.$store.state.country.currency
      );
    },
  },
  methods: {
    submitForm() {
      const errorFields = this.$store.getters.isFieldsEmpty;
      // Check of there is an error if not submit form
      if (errorFields.length > 0) {
        errorFields.forEach((item) => {
          this[item + "Error"] = "invalid";
        });
      } else {
        this.$store.dispatch("paymentIsSuccessful");
      }
    },
  },
};
</script>
<style lang="scss">
form {
  width: 100%;
  margin-top: 20px;

  button {
    background: #2af5d6;
    border-radius: 4px;
    border: 0;
    outline: 0;
    padding: 14px 95px;
    width: 100%;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s ease, color 0.2s ease;

    &:hover {
      background: #5fffe6;
    }

    &:active {
      background: #2ab8f5;
      color: #fff;
    }
  }

  @media all and (min-width: 600px) {
    width: 300px;
  }
}

.form-wrap {
  display: flex;
  justify-content: space-between;

  .form-group {
    width: 49%;
  }
}
</style>
