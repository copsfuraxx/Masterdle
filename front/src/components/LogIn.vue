<template>
  <div>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required>

      <label for="password">Password:</label>
      <input type="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
  </div>
  <div>
    <p id="msg"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      fetch(import.meta.env.VITE_API + 'auth/login', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: this.username, passwrd: this.password })
      }).then(function (response) {
        response.json().then(function (data) {
          if (response.status !== 200) {
            console.log(response.status);
            document.getElementById('msg').innerText = data;
            return;
          }
          $cookies.set('accessToken', data.accessToken, '1h');
          $cookies.set('refreshToken', data.refreshToken, '1h');
          console.log(data);
        });
      }).catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
    },
  },
};
</script>