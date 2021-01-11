<template>
  <v-form>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="8" lg="10">
          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.max]"
            label="Username"
            hint="阁下怎么称呼？"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6" md="8" lg="10">
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.max]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="6-24 characters"
            counter
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="primary" large dark @click="register">
          Register
        </v-btn>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
      >
        {{ snackbarText }}
        <v-btn dark text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-container>
  </v-form>
</template>

<script>
import { userService } from "../../services/user.service";

export default {
  data() {
    return {
      showPassword: false,
      showReEnter: false,
      username: "",
      password: "",

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        max: (v) => v.length <= 24 || "Max 24 characters",
      },
      snackbar: "",
      snackbarColor: "",
      snackbarText: "",
      snackbarTimeout: 2000,
    };
  },
  computed: {
    disableRegister() {
      const username = this.username !== null && this.username.length <= 24;
      const psw = this.password !== null && this.password.length >= 6 && this.password.length <= 24;
      if (username &&  psw) {
        return false;
      }
      return true;
    },
  },
  methods: {
    showSnackbar(type, content) {
      this.snackbarColor = type;
      this.snackbarText = content;
      this.snackbar = true;
    },
    register() {
      if (this.disableRegister) {
        this.showSnackbar('warning', '输入格式有误');
        return;
      }
      let userinfo = {'username':this.username, 'password':this.password};
      userService.register(userinfo).then((resp) => {
        console.log(resp.message);
        if (resp.message) {
          this.showSnackbar('error', resp.message);
        } else {
          this.showSnackbar('success', '注册成功，跳转登录页面……');
          setTimeout(() => {
            this.$router.push('login');
          }, 1000);
        }
      });
    },
  },
};
</script>
