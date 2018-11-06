<template>
  <div id="app">
    <div id="nav">
      <span @click="$router.push({ path: '/' })">MVHS Activity Requests</span>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/track">Track Request</router-link>
    </div>
    <div style="padding: 30px;">
      <router-view/>
    </div>
  </div>
</template>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  #nav span {
    font-size: 20px;
    flex: 5;
    display: block;
    padding: 20px;
    cursor: pointer;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #nav {
    display: flex;
    justify-content: flex-end;
    height: 64px;
    z-index: 10;
    box-shadow: 0 0.2rem 0.4rem rgba(0,0,0,0.23);
  }

  #nav a {
    font-weight: bold;
    color: #000;
    text-decoration: none;
    padding: 20px;
    transition: 0.3s ease all;
    display: block;
    cursor: pointer;
  }

  #nav a:hover {
    background: #eee;
  }

  #nav a.router-link-exact-active {
    color: #fccb0b;
  }
</style>
