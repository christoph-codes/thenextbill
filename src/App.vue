<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,300i,700,700i&display=swap");
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --prime: #3b4557;
  --secon: #21f787;
  --terti: #f48b22;
  --danger: #f22552;
  --gray: #898f9a;
}
html {
  background: var(--prime);
}
.home h1,
.home p {
  color: white;
}
.btn {
  padding: 10px 25px;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
}
.btn.prime {
  background: var(--secon);
  color: var(--prime);
}
a.link {
    display: block;
    margin: 10px 0;
    color: var(--gray);
}
p {
  font-size: 16px;
}
.narrow {
  margin: 0 auto;
  max-width: 600px;
  padding: 0 30px;
}
</style>
