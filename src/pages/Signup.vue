<template>
  <v-app id="signup" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img src="/static/m.png" alt="Matsuri cash flow manager logo" width="120" height="120">
                  <h1 class="my-title flex my-4 primary--text">Matsuri cash flow manager</h1>
                </div>                
                <v-form>
                  <v-text-field append-icon="person" name="signup" label="Sign up" type="text" v-model="model.username"></v-text-field>
                  <v-text-field append-icon="lock" name="password" label="Password" id="password" type="password" v-model="model.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link to="/login">Already have an account</router-link>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="signup" :loading="loading">Sign up</v-btn>
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
    signup () {
      this.loading = true;
      axios.post('/users/signup', {
        username: this.model.username,
        password: this.model.password
      })
        .then(response => {
          this.loading = false;
          console.log(response);
          if (response.data.success) {
            this.$router.push('/login');
          }
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
  #signup {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
