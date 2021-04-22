import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    error: "",
    paymentSuccessful: false,
    country: {
      id: "LT",
      name: "Lithuania",
      currency: "EUR",
    },
    countryList: [
      {
        id: "LT",
        name: "Lithuania",
        currency: "EUR",
      },
      {
        id: "PL",
        name: "Poland",
        currency: "PLN",
      },
      {
        id: "US",
        name: "United States",
        currency: "USD",
      },
    ],
    paymentMethods: "",
    paymentMethodSelected: "",
    form: {
      amount: "",
      cardHolderName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cvv: "",
    },
  },
  mutations: {
    changeCountry(state, payload) {
      state.country = payload;
    },
    isPaymentMethodSelected(state, payload) {
      state.paymentMethodSelected = payload;
    },
    updateForm(state, payload) {
      state.form[payload.name] = payload.value;
    },
    resetSelectedPaymentMethod(state) {
      state.paymentMethodSelected = "";
    },
    resetForm(state) {
      state.form = {
        amount: "",
        cardHolderName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cvv: "",
      };
    },
    paymentIsSuccessful(state) {
      state.paymentSuccessful = true;
    },
  },
  actions: {
    // Change country to selected country
    changeCountry(context, payload) {
      context.commit("changeCountry", payload);
    },
    // set payment status
    isPaymentMethodSelected(context, payload) {
      context.commit("isPaymentMethodSelected", payload);
    },
    // fetch data from api
    fetchDataFromApi() {
      axios
        .get(
          "https://api.paymentwall.com/api/payment-systems/?key=0cf8f2cdc8e141213d18b997ba0c35f8&country_code=" +
            this.state.country.id
        )
        .then((response) => {
          this.state.paymentMethods = response.data;
        })
        .catch(() => {
          this.state.error = "Something went wrong";
        });
    },
    // Update ant reset states
    updateForm(context, payload) {
      context.commit("updateForm", payload);
    },
    resetForm(context) {
      context.commit("resetForm");
    },
    resetSelectedPaymentMethod(context) {
      context.commit("resetSelectedPaymentMethod");
    },
    paymentIsSuccessful(context) {
      context.commit("paymentIsSuccessful");
    },
  },
  getters: {
    // Get all form state, if emty push error
    isFieldsEmpty: (state) => {
      let fieldsList = [];
      for (let [key, value] of Object.entries(state.form)) {
        if (value === "") {
          key === "cardMonth" || key === "cardyear" ? (key = "expiration") : "";
          fieldsList.push(key);
        }
      }

      return fieldsList;
    },
  },
});
