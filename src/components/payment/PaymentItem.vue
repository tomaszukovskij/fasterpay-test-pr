<template>
  <div class="payments--card">
    <div class="card__image">
      <img :src="item.img_url" :alt="item.name" />
    </div>
    {{ item.name }}
  </div>
</template>
<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss">
.payments--card {
  cursor: pointer;
  font-size: 12px;
  width: calc(50% - 8px);
  margin-bottom: 20px;
  text-align: center;

  @media all and (min-width: 600px) {
    margin: 0 8px 20px 8px;
    text-align: left;
    width: 110px;

    &:nth-child(4n-7) {
      margin-left: 0;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }
  }

  &:last-child {
    margin-right: 0;
  }
}
.card__image {
  background: #ffffff;
  /* Additional / Lines Light */

  border: 1px solid #f2f7ff;
  box-sizing: border-box;
  box-shadow: 0px 5px 12px rgba(94, 104, 123, 0.2);
  border-radius: 4px;
  width: 100%;
  height: 92px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  @media all and (min-width: 600px) {
    height: 72px;
  }

  img {
    max-width: 80px;
  }

  .active &,
  &:hover {
    box-shadow: 0px 5px 12px rgba(42, 245, 214, 0.4);
  }
}
</style>
