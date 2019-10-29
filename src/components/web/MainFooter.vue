<template>
  <div class="main-footer">
    <div class="main">
      <small class="small-text">
        Copyright © 2019. The Next Bill, a TKC Pro Company. All Rights Reserved.
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainFooter"
};
</script>

<style>
.main-footer {
  position: fixed;
  bottom: 0;
  background: var(--prime);
  width: 100%;
  padding: 5px 0;
  text-align: center;
}
.main-footer small {
  color: var(--gray);
  font-size: 10px;
}
</style>
