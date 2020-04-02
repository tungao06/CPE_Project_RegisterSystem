<template>
  <v-container>
    <v-container row>
      <v-spacer></v-spacer>
      <h4 class="display-1">ประกาศข่าว</h4>
      <v-spacer></v-spacer>
    </v-container>
    <v-container dense v-for="(message, i) in notices" :key="i">
      <v-card class="mx-auto" max-width="80%">
        <!-- color="#ffe4c4" -->
        <v-alert border="top" colored-border color="info accent-4" elevation="2">
          <v-card-title>{{message.title}}</v-card-title>
          <v-card-text>&emsp;&emsp;{{message.information}}</v-card-text>
          <v-layout v-if="message.imageUrl != ''">
            <v-flex xs12 xm4 offset-sm2>
              <img :src="message.imageUrl" height="400" width="600" />
            </v-flex>
          </v-layout>
          <v-layout justify-end wrap>
            <v-flex xs12 sm4 text-center>
              <v-card-text v-text="message.date"></v-card-text>
            </v-flex>
          </v-layout>
        </v-alert>
      </v-card>
    </v-container>
  </v-container>
</template>>

<script>
//import firebase from 'firebase'

export default {
  data() {
    return {
      drawer: null,
      notices: []
    };
  },
  created() {
    this.$store.dispatch("showNotice", this.notices);
  }
};
</script>
