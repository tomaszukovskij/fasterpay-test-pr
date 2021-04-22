<template>
  <section class="country">
    <div>
      <h2>Choose country</h2>
    </div>
    <div class="country__wrap">
      <label for="">Country: </label>
      <div class="country__current">
        <span @click="showCountryList">{{ getCurrentCountry }}</span>
        <ul class="country__list" :class="countryListClass">
          <li
            v-for="country in getCountryList"
            :key="country.id"
            @click="selectCountry(country)"
          >
            {{ country.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["currentCountry"],
  data() {
    return {
      countryListVisible: false,
    };
  },
  computed: {
    getCountryList() {
      return this.$store.state.countryList;
    },
    getCurrentCountry() {
      return this.$store.state.country.name;
    },
    countryListClass() {
      return {
        active: this.countryListVisible,
      };
    },
  },
  methods: {
    selectCountry(value) {
      this.$store.dispatch("changeCountry", value);
      this.showCountryList();
      // After country change fetch data one more time
      this.$store.dispatch("fetchDataFromApi");
      this.$store.dispatch("resetForm");
      this.$store.dispatch("resetSelectedPaymentMethod");
    },
    showCountryList() {
      this.countryListVisible = !this.countryListVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.country__wrap {
  display: flex;
  align-items: center;
}
.country__current {
  position: relative;
  margin-left: 10px;
  border-bottom: 1px solid #000;

  span {
    cursor: pointer;
  }
}
.country__list {
  list-style-type: none;
  padding-left: 0;
  box-shadow: 0px 5px 12px rgb(94 104 123 / 20%);
  position: absolute;
  z-index: 2;
  background: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  &.active {
    opacity: 1;
    visibility: visible;
  }

  li {
    padding: 5px 10px;
    white-space: nowrap;
    left: 0;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: #1169ff;
    }
  }
}
</style>
