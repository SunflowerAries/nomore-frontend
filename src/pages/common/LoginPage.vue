<template>
  <v-form>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="10">
          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.max]"
            label="Username"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="10">
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.max]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
        {{ snackbarText }}
        <v-btn dark text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-row justify="center">
            <v-btn color="primary" large dark @click="login">
              登录
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
      <v-btn
        class="mx-2"
        style="position: fixed; bottom: 10%; right: 5%;"
        fab
        dark
        color="indigo"
        @click="$router.push('/register')"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';
import { userService } from "../../services/user.service";
import { docsService } from "../../services/docs.service";


export default {
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    rules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 6 || 'Min 6 characters',
      max: (v) => v.length <= 24 || 'Max 24 characters',
    },
    snackbar: '',
    snackbarColor: '',
    snackbarText: '',
    snackbarTimeout: 2000,
  }),

  computed: {
    ...mapState(['user']),
  },

  methods: {
    disableLogin() {
      const unm = this.username !== null && this.username.length <= 24;
      const psw = this.password !== null && this.password.length >= 6 && this.password.length <= 24;
      if (unm && psw) {
        return false;
      }
      return true;
    },
    showSnackbar(type, content) {
      this.snackbarColor = type;
      this.snackbarText = content;
      this.snackbar = true;
    },
    getDocsName() {
      docsService.getDocsName()
        .then((resp) => {
          console.log('docsname', resp);
        })
        .catch((error) => {
          console.log(error);
        });
      // getMyMessage()
      //   .then((messages) => {
      //     this.$store.commit('SET_MESSAGES', messages);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },

    login() {
      if (this.disableLogin()) {
        this.showSnackbar('warning', '输入格式错误');
        return;
      }
      let userinfo = {'username':this.username, 'password':this.password};
      userService.login(userinfo).then((resp) => {
        if (resp.message) {
          this.showSnackbar('error', resp.message);
        } else {
          this.$store.commit('SET_USER', resp);
          this.getDocsName();
          this.showSnackbar('success', '欢迎回来');
          setTimeout(() => {
            this.$router.push('docs');
          }, 1000);
        }
      });
    },
  },
};
</script>
