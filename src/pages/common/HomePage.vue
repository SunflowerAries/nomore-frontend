<template>
  <v-row justify="center">
    <v-container>
      <v-list rounded>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in docs" :key="index" :to="`/docs/${item.docName}`">
            <v-list-item-avatar>
              <v-icon
                :class="'blue'"
                dark
                v-text="'mdi-clipboard-text'"
              ></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.docName" />
              <v-list-item-subtitle v-text="item.time"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
    <v-btn
      class="mx-2"
      style="position: fixed; bottom: 10%; right: 5%"
      fab
      dark
      color="indigo"
      @click="showDialog = true"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
    <v-dialog v-model="showDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"> New Document </v-card-title>
        <v-textarea
          v-model="newDocName"
          class="ma-3"
          label="Doc Name"
          hint=""
          rows="1"
          outlined
          rounded
          no-resize
          auto-grow
          :rules="docNameRules"
          counter="64"
        />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="green darken-1"
            text
            @click="(newDocName = ''), (showDialog = false)"
          >
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="newDoc()"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
    >
      {{ snackbarText }}
      <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { docsService } from "../../services/docs.service";
import { mapGetters } from "vuex";
import renderTime from "../../utils/time";

export default {
  data: () => ({
    newDocName: "",
    docNameRules: [
      (value) => !value || value.length <= 64 || "No more than 64 words",
    ],
    showDialog: false,
    snackbar: "",
    snackbarColor: "",
    snackbarText: "",
    snackbarTimeout: 2000,
  }),
  created() {
    this.getDocsInfo();
  },
  computed: {
    ...mapGetters(["countDocs"]),
    docs() {
      const docs = [];
      this.$store.state.docs.forEach((element) => {
        const time = { time: renderTime(element.createdAt) };
        docs.push({
          ...element,
          ...time,
        });
      });
      return docs;
    },
  },
  methods: {
    getDocsInfo() {
      docsService.getDocsName().then(
        (re) => {
          console.log(re);
          this.$store.commit("SET_DOCS", re);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    showSnackbar(type, content) {
      this.snackbarColor = type;
      this.snackbarText = content;
      this.snackbar = true;
    },
    newDoc() {
      if (this.newDocName == null) {
        this.showSnackbar("error", "Invalid Name");
      } else {
        this.getDocsInfo();
        docsService.createDoc(this.newDocName).then((resp) => {
          if (resp.message) {
            this.showSnackbar("error", resp.message);
            console.log(resp);
          }
        });
        this.$router.push(`/docs/${this.newDocName}`);
      }
    },
  },
};
</script>

<style></style>
