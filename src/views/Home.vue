<template>
  <div class="home">
    <MainLogo />
    <HelloWorld msg="The Next Bill App is Here!" />
    <MainFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MainLogo from "@/components/web/MainLogo.vue";
import MainFooter from "@/components/web/MainFooter.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    MainLogo,
    MainFooter
  }
};
</script>
