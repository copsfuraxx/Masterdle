<script setup>
  import NavigationBar from './components/NavigationBar.vue';
</script>

<template>
  <header>
    <NavigationBar/>
  </header>

  <main>
    <router-view></router-view>
  </main>
</template>