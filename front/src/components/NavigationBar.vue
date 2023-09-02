<template>
    <nav>
        <div id="log">
            <button @click="goToLogInPage">Log-In</button>
            <button>Sign-Up</button>
        </div>
    </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
    goToLogInPage() {
      this.$router.push("/log-in");
    },
  },
};
</script>

<style scoped>
* {
    background-color: #1a3e78;
    color: white;
    font-size: 12px;
}
nav {
    height: 10vh;
}
#log {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
}
#log button{
    margin: 10px;
    padding: 10px;
    border: medium solid black;
    border-radius: 15px;
}
#log button:hover {
    background-color: #1f437d;
    border: medium solid #202020;
}
#log button:active {
    transform: translateY(3px);
}
</style>