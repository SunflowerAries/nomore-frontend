<template>
  <v-container fluid>
    <meta charset="utf-8" />
    <title>ShareDB Textarea</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />

    <v-row justify="center">
      <v-col cols="12">
        <p>Connection Status: <span id="status-span"></span></p>
        <!-- <textarea
          autofocus
          style="position: absolute; height: 700px"
        ></textarea> -->
        <v-textarea
          autofocus
          outlined
          name="input-7-4"
          label="Content"
          value=""
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="../../static/dist/bundle.js"></script>


// <script>
// export default {
//   data() {
//     return {
//       message: false,
//     };
//   },
//   mounted() {
//     let recaptchaScript = document.createElement("script");
//     recaptchaScript.setAttribute("src", "../../bundle.js");
//     document.head.appendChild(recaptchaScript);
//   },
// };
// </script>

<style src="../../css/bootstrap.min.css"></style>

<style scoped>
@import "../../css/bootstrap.min.css";
body {
  background: #e9ecef;
}
#container {
  position: absolute;
  top: 24px;
  right: 24px;
  bottom: 24px;
  left: 24px;
}
textarea {
  font: 14px/1.3 sans-serif;
  padding: 4px 8px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
#title {
  font-size: 24;
}
</style>
