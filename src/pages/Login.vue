<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Matsuri cash flow manager logo" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Matsuri cash flow manager</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="login" label="Login" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/signup">Create an account</router-link>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from '../axios';

export default {
  data: () => ({
    loading: false,
    model: {
      username: '',
      password: ''
    }
  }),

  methods: {
    login () {
      this.loading = true;
      axios.post('/users/signin', {
        username: this.model.username,
        password: this.model.password
      })
        .then(response => {
          this.loading = false;
          console.log(response);
          if (!response.data.token) {
            localStorage.removeItem('user-token');
            this.loading = false;
            return;
          }

          localStorage.setItem('user-token',response.data.token);
          window.getApp.$emit('APP_LOGIN_SUCCESS');
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
