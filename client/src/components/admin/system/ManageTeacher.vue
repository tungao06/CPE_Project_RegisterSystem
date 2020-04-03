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
              <v-combobox
                :items="teachers"
                v-model="teacher"
                item-text="username"
                label="อาจารย์ที่ปรึกษา"
              ></v-combobox>
              <v-btn color="error" @click="deleteTeacher">ลบ</v-btn>
              <v-data-table :headers="headers" :items="teachers" item-key="username"></v-data-table>
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
import api from "../../../API";
export default {
  data: () => ({
    formTeacher: {
      prefix: "",
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    },
    snackbar: false,
    teachers: [],
    teacher: "",
    message: "",
    headers: [
      {
        text: "Username",
        value: "username"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Firstname",
        value: "firstname"
      },
      {
        text: "LastName",
        value: "lastname"
      }
    ],
    delTeacher: null
  }),
  created() {
    api
      .get("/api/all/teacher/role")
      .then(response => {
        console.log(response);
        this.teachers = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    async addTeacher() {
      var data = {
        username: this.formTeacher.username,
        password: this.formTeacher.password,
        prefix: this.formTeacher.prefix,
        firstname: this.formTeacher.firstname,
        lastname: this.formTeacher.lastname,
        roles: ["teacher"]
      };
      await api
        .post("/api/auth/signup", data, {
          headers: {
            "content-type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
          this.message = "เพิ่มข้อมูลอาจารย์ที่ปรึกษาแล้ว";
          this.snackbar = !this.snackbar;
        })
        .catch(error => {
          console.log(error);
          this.message = "ไม่สามารถเพิ่มข้อมูลอาจารย์ที่ปรึกษาได้";
          this.snackbar = !this.snackbar;
          this.errored = true;
        });
    },
    async deleteTeacher() {
      await api
        .delete("/api/teacher", {
          headers: {
            "content-type": "application/json"
          },
          data: {
            username: this.teacher.username
          }
        })
        .then(response => {
          console.log(response);
          this.message = "ลบข้อมูลอาจารย์ที่ปรึกษาแล้ว";
          this.snackbar = !this.snackbar;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>