<template>
  <!-- Amount field -->
  <div
    class="form-group form-group--amount"
    :class="{
      error: validateInput === 'invalid',
      filled: validateInput === 'valid',
    }"
    v-if="field === 'amount'"
  >
    <label>{{ label }}</label>
    <div class="form-group__relative">
      <input type="number" @blur="validate('amount')" v-model.number="amount" />
      <span>{{ $store.state.country.currency }}</span>
    </div>
    <p v-if="validateInput === 'invalid'">
      {{ errorMsg }}
    </p>
  </div>

  <!-- Cardholder name field -->
  <div
    class="form-group"
    :class="{
      error: validateInput === 'invalid',
      filled: validateInput === 'valid',
    }"
    v-if="field === 'cardHolderName'"
  >
    <label>{{ label }}</label>
    <input
      type="text"
      @blur="validate('vModel')"
      v-model="vModel"
      @keypress="isLetter($event)"
    />
    <p v-if="validateInput === 'invalid'">
      {{ errorMsg }}
    </p>
  </div>

  <!-- Card number field -->
  <div
    class="form-group"
    :class="{
      error: validateCardNumber === 'invalid',
    }"
    v-if="field === 'cardNumber'"
  >
    <label>{{ label }}</label>
    <input type="number" @blur="validate('cardNumber')" v-model="cardNumber" />
    <p v-if="validateCardNumber === 'invalid'">
      {{ errorMsg }}
    </p>
  </div>

  <!-- CVV field -->
  <div
    class="form-group"
    :class="{ error: validateInput === 'invalid' }"
    v-if="field === 'cvv'"
  >
    <label>{{ label }}</label>
    <input
      type="text"
      @blur="validate('vModel')"
      maxlength="4"
      v-model="vModel"
      @keypress="onlyNumber"
    />
    <p class="error" v-if="validateInput === 'invalid'">
      {{ errorMsg }}
    </p>
  </div>

  <!-- Expiration date field -->
  <div
    class="form-group"
    :class="{ error: validateInput === 'invalid' || validateExp === 'invalid' }"
    v-if="field === 'expiration'"
  >
    <label>{{ label }}</label>
    <div class="form-group__select">
      <select
        v-model="cardMonth"
        @blur="validate('expiration')"
        :class="cardMonthClass"
      >
        <option value="" disabled selected>Month</option>
        <option
          v-bind:value="number"
          v-for="number in 12"
          v-bind:disabled="number < minCardMonth"
          v-bind:key="number"
        >
          {{ number }}
        </option>
      </select>
      <select
        v-model="cardYear"
        @blur="validate('expiration')"
        :class="cardYearClass"
      >
        <option value="" disabled selected>Year</option>
        <option
          v-bind:value="$index + minCardYear"
          v-for="(n, $index) in 12"
          v-bind:key="n"
        >
          {{ $index + minCardYear }}
        </option>
      </select>
    </div>
    <p v-if="validateInput === 'invalid' || validateExp === 'invalid'">
      {{ errorMsg }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["label", "errorStatus", "field", "inputType", "errorMsg"],
  data() {
    return {
      cardMonth: "",
      cardYear: "",
      cardNumber: "",
      minCardYear: new Date().getFullYear(),
      vModel: "",
      amount: "",
      validateInput: null,
      validateCardNumber: null,
      validateExp: null,
    };
  },
  watch: {
    // check values for select
    cardMonth(value) {
      this.addFormValue(value, "cardMonth");
    },
    // check card year
    cardYear(value) {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
      this.addFormValue(value, "cardYear");
    },
    // check card number
    cardNumber(value) {
      this.addFormValue(value, "cardNumber");
    },
    // check all other fields
    vModel(value) {
      this.addFormValue(value, this.field);
    },
    amount(value) {
      value > 0 ? this.addFormValue(value, this.field) : "";
    },
    // check for input error
    errorStatus(value) {
      if (this.field === "cardNumber") {
        value === "invalid" ? (this.validateCardNumber = "invalid") : "";
      } else {
        value === "invalid" ? (this.validateInput = "invalid") : "";
      }
    },
  },
  computed: {
    // Min card month
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
    cardMonthClass() {
      return { filled: this.cardMonth !== "" };
    },
    cardYearClass() {
      return { filled: this.cardYear !== "" };
    },
  },
  methods: {
    // Allow cardholder name type only letters
    isLetter($event) {
      let char = String.fromCharCode($event.keyCode);
      if (/^[A-Za-z]+$/.test(char) || char === " ") return true;
      else $event.preventDefault();
    },
    // Allow only numbers for CVV
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // Method to add value to store
    addFormValue(value, name) {
      const fieldData = {
        name: name,
        value: value,
      };
      this.$store.dispatch("updateForm", fieldData);
    },
    // Validate input on blur. Validate by type.
    validate(type) {
      if (type === "vModel") {
        if (this.vModel === "" || this.vModel === "0") {
          this.validateInput = "invalid";
        } else {
          this.validateInput = "valid";
        }
      } else if (type === "expiration") {
        if (this.cardMonth === "" || this.cardYear === "") {
          this.validateExp = "invalid";
        } else {
          this.validateExp = "valid";
          this.validateInput = "valid";
        }
      } else if (type === "cardNumber") {
        // Validate card number The Luhn Algorithm taken from https://gist.github.com/DiegoSalazar/4075533
        // Accept only digits, dashes or spaces

        let value = this.cardNumber;
        if (/[^0-9-\s]+/.test(value)) return false;

        let nCheck = 0,
          bEven = false;
        value = value.replace(/\D/g, "");

        for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

          if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

          nCheck += nDigit;
          bEven = !bEven;
        }

        // Condition for validation
        if ((nCheck % 10 !== 0 && value.length !== 16) || value === "") {
          this.validateCardNumber = "invalid";
        } else if (nCheck % 10 == 0 && value.length == 16) {
          this.validateCardNumber = "valid";
        }
      } else if (type === "amount") {
        this.amount > 0
          ? (this.validateInput = "valid")
          : (this.validateInput = "invalid");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-bottom: 10px;
  label {
    font-size: 12px;
    display: block;
    margin-bottom: 5px;
    font-weight: 700;
  }

  input {
    border: 1px solid #c8d4ea;
    box-sizing: border-box;
    border-radius: 6px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 0 10px;
    outline: none;

    &:focus,
    &:active {
      border-color: #1169ff;
    }
  }

  select {
    appearance: none;
    border: 1px solid #c8d4ea;
    box-sizing: border-box;
    border-radius: 6px;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding: 0 10px;

    &.filled {
      border-color: #23c5ac;
    }
  }

  &__select {
    display: flex;
  }

  p {
    font-size: 10px;
    margin-top: 2px;
  }

  &.error {
    color: red;
    input {
      border-color: red;
    }

    select:not(.filled) {
      border-color: red;
    }
  }

  &.filled {
    input {
      border-color: #23c5ac;
    }
  }

  &--amount {
    margin-bottom: 50px;
  }

  &__relative {
    position: relative;
    input {
      padding-right: 50px;
    }

    span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      color: #68879a;
    }
  }
}
</style>
