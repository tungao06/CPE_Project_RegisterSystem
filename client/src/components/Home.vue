<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-container>
        <h6 class="title">เข้าสู่ระบบ</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="/slogin">
          <v-list-item-action>
            <v-icon>{{svgPath}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สำหรับนักศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/tlogin">
          <v-list-item-action>
            <v-icon>{{svgPath}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สำหรับอาจารย์</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Project Registration System</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-container row>
          <h4 class="display-1">ประกาศข่าว</h4>
          <v-spacer></v-spacer>
          <router-link link to="allNotice">ดูประกาศข่าวทั้งหมด</router-link>
        </v-container>
        <v-container dense v-for="(message, i) in notices.slice(0,3)" :key="i">
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
                <!-- <v-flex xs12 sm2 text-center>
                            <v-card-text>01-01-0001</v-card-text>
                </v-flex>-->
              </v-layout>
            </v-alert>
          </v-card>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mdiAccount } from "@mdi/js";
export default {
  data() {
    return {
      svgPath: mdiAccount,
      drawer: null,
      notices: []
    };
  },
  created() {
    this.$store.dispatch("showNotice", this.notices);

    // eslint-disable-next-line
    console.log(this.notices);
  }
};
</script>


