<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list danse>
        <v-list-item link to="profile">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>โปรไฟล์</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="notice">
          <v-list-item-action>
            <v-icon>mdi-bulletin-board</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ประกาศ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="reg">
          <v-list-item-action>
            <v-icon>mdi-calendar-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ข้อมูลปีการศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item @click.prevent="logout" link to="/tlogin">
          <v-list-item-action>
            <v-icon>mdi-account-off</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ออกจากระบบ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Project Registration System</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <v-flex>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },
  logout() {
    localStorage.removeItem('teacher');
  }
};
</script>


