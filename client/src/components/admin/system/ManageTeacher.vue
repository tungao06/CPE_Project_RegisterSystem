<template>
  <v-app>
    <v-container>
      <h6 class="title">เพิ่ม - ลด อาจารย์ที่ปรึกษา</h6>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
                <h6 class="title">เพิ่มอาจารย์ที่ปรึกษา</h6>
              <v-text-field label="คำนำหน้า" required v-model="formTeacher.prefix"></v-text-field>
              <v-text-field label="ชื่อ" required v-model="formTeacher.firstname"></v-text-field>
              <v-text-field label="สกุล" required v-model="formTeacher.lastname"></v-text-field>
              <v-text-field label="username" required v-model="formTeacher.username"></v-text-field>
              <v-text-field
                label="password"
                required
                type="password"
                v-model="formTeacher.password"
              ></v-text-field>
              <v-btn color="primary" @click="addTeacher">เพิ่ม</v-btn>
            </v-col>
            <v-col cols="12" md="6">
                <h6 class="title">ลบอาจารย์ที่ปรึกษา</h6>
              <v-combobox :items="teachers" v-model="delTeacher" label="อาจารย์ที่ปรึกษา"></v-combobox>
              <v-btn color="error" @click="deleteTeacher">ลบ</v-btn>
              <v-data-table :items="teachers" :headers="headers"></v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ message }}
        <v-btn text @click="snackbar = false">ปิด</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    formTeacher: {
      prefix: null,
      firstname: null,
      lastname: null,
      username: null,
      password: null
    },
    snackbar: false,
    teachers: [],
    message: "",
    headers: [
      {
        text: "อาจารย์ที่ปรึกษา",
        value: "text"
      }
    ],
    delTeacher: null
  }),
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
    firebase
      .database()
      .ref("teacher")
      .on("child_removed", snapshot => {
        const del = this.teachers.find(teach => teach.value === snapshot.key);
        const index = this.teachers.indexOf(del);
        this.teachers.splice(index, 1);
      });
  },
  methods: {
    addTeacher: async function() {
      await firebase
        .database()
        .ref("teacher/" + this.formTeacher.username)
        .set({
          firstname: this.formTeacher.firstname,
          lastname: this.formTeacher.lastname,
          prefix: this.formTeacher.prefix
        });
      await firebase
        .database()
        .ref("teacher_login/" + this.formTeacher.username)
        .set({
          username: this.formTeacher.username,
          password: this.formTeacher.password
        });
      this.message = "เพิ่มข้อมูลอาจารย์ที่ปรึกษาแล้ว";
      this.snackbar = !this.snackbar;
    },
    deleteTeacher: async function() {
      await firebase
        .database()
        .ref("teacher")
        .child(this.delTeacher.value)
        .remove();
      await firebase
        .database()
        .ref("teacher_login")
        .child(this.delTeacher.value)
        .remove();
      await firebase
        .database()
        .ref("teacher_profile")
        .child(this.delTeacher.value)
        .remove();
      this.message = "ลบข้อมูลอาจารย์ที่ปรึกษาแล้ว";
      this.snackbar = !this.snackbar;
    }
  }
};
</script>