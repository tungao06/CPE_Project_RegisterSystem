<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>สำหรับนักศึกษา</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field label="รหัสนักศึกษา" name="login" type="text" v-model="user.username"></v-text-field>

                  <v-text-field
                    id="password"
                    label="รหัสผ่าน"
                    name="password"
                    type="password"
                    v-model="user.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text replace to="/home">กลับ</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="login">เข้าสู่ระบบ</v-btn>
              </v-card-actions>
            </v-card>
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
      user: {
        username: null,
        password: null
      }
    };
  },
  methods: {
    login: function () {
      this.$store.dispatch('loginStudent', this.user)
    }
  }
};
</script>

