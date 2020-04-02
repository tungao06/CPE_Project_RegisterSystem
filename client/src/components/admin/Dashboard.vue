<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-container>
        <h6 class="title">ปีการศึกษา</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link to="manage">
          <v-list-item-action>
            <v-icon>mdi-calendar-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ข้อมูลปีการศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="manual">
          <v-list-item-action>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>จัดอันดับนักศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container>
        <h6 class="title">จัดการ</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link replace to="notice">
          <v-list-item-action>
            <v-icon>mdi-clipboard-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>จัดการประกาศ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="seat">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>จัดที่นั่งอาจารย์ที่ปรึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="teacher">
          <v-list-item-action>
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>เพิ่ม-ลดอาจารย์ที่ปรึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="schoolyear">
          <v-list-item-action>
            <v-icon>mdi-package</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>จัดการปีการศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="upload">
          <v-list-item-action>
            <v-icon>mdi-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>อัปโหลดข้อมูลนักศึกษา</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link replace to="statistic">
          <v-list-item-action>
            <v-icon>mdi-chart-timeline-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>สถิติการลงทะเบียน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-container>
        <h6 class="title">ระบบ</h6>
      </v-container>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link replace to="/alogin">
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
            <router-view></router-view>
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
      drawer: null,
    };
  }
};
</script>


