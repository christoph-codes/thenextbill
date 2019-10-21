<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "../node_modules/uikit/dist/js/uikit-core.js";
import "../node_modules/uikit/dist/js/uikit.js";
import "../node_modules/uikit/dist/js/uikit-icons.min.js";

export default {
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,300i,700,700i&display=swap");
@import "../node_modules/uikit/dist/css/uikit-core.css";

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:root {
  --prime: #3b4557;
  --secon: #21f787;
  --lsecon: #a6fccf;
  --wsecon: #edfef5;
  --terti: #f48b22;
  --lterti: #f8b97a;
  --wterti: #fde8d3;
  --danger: #f22552;
  --gray: #898f9a;
  --lgray: #d8dadd;
  --wgray: #eff0f1;
}
html {
  background: var(--prime) !important;
}
::selection {
  background: var(--lgray);
  color: var(--gray);
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
  border: none;
  cursor: pointer;
  max-width: 300px;
  width: 100%;
  margin: 0 5px 10px;
  transition: 0.3s;
  text-align: center;
}
.btn.prime {
  background: var(--secon);
  color: var(--prime);
}
.btn.secon {
  background: var(--terti);
  color: var(--prime);
}
.btn.terti {
  background: var(--lgray);
  color: var(--gray);
}
.btn.danger {
  background: var(--danger);
  color: white;
}
.btn:hover {
  background: var(--gray);
  color: white;
}
a,
a * {
  transition: 0.3s;
}
a.link {
  display: block;
  margin: 10px 0;
  color: var(--gray);
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;
}
a.link:hover {
  color: white;
}
p {
  font-size: 16px;
}
.main {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 30px;
}
.narrow {
  margin: 0 auto;
  max-width: 600px;
  padding: 0 30px;
}
form label {
  font-weight: bold;
  color: var(--gray);
  font-size: 14px;
}
input[type="text"],
input[type="email"],
input[type="number"],
select,
input[type="radio"],
input[type="date"],
input[type="password"] {
  width: 100%;
  height: 30px;
  border: solid var(--wgray) 1px;
  padding: 5px;
  font-size: 16px;
  color: var(--prime);
  border-radius: 5px;
  margin-bottom: 20px;
}
input[type="text"],
input[type="email"],
input[type="number"],
input[type="radio"],
input[type="date"],
input[type="password"] {
  height: 30px;
}
/* input::placeholder {
  color: var(--lgray);
} */
select {
  height: 40px;
  background: white;
  width: calc(100% + 10px);
}
form input[type="submit"] {
  text-align: center;
  display: block;
  margin: 0 auto 10px;
}
form a.link {
  text-align: center;
}
input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}
section.hero {
  position: relative;
  height: calc(100vh - 20px);
  text-align: center;
}
section.hero .content {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1.page-header,
.content p {
  color: white;
}
.content p {
  font-size: 18px;
  line-height: 170%;
}
.text-danger {
  color: var(--danger);
}
.uk-modal-dialog p {
  color: var(--gray);
  font-size: 18px;
  font-weight: lighter;
}
</style>
