<template>
  <v-app>
    <v-container>
      <h6 class="title">จัดอันดับนักศึกษา</h6>
      <v-layout row align-baseline>
        <v-data-table
          :headers="headers"
          show-select
          v-model="selected"
          :items="student"
          multi-sort
          class="elevation-1"
          :items-per-page="5"
        ></v-data-table>

        <v-card class="elevation-1 mt-3 ml-3" tile min-width="600">
          <v-card-title class="title">เพิ่มอาจารย์ให้นักศึกษา</v-card-title>
          <v-card-text>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  outlined
                  dark
                  v-on="on"
                  class="elevation-1"
                >เลือกอาจารย์ที่ปรึกษา</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="t in teacher" :key="t.value" @click="getTeacher(t)">
                  <v-list-item-title>{{ t.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  outlined
                  dark
                  v-on="on"
                  class="elevation-1 ml-3"
                >เลือกปีการศึกษา</v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="year in years"
                  :key="year.id"
                  @click="getYear(year.year)"
                  @change="getRegStudent"
                >
                  <v-list-item-title>{{ year.year }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-layout>
              <v-list>
                <v-list-item>
                  <v-list-item-title>ปีการศึกษา: {{ this.$store.getters.getSchoolYear }}</v-list-item-title>
                </v-list-item>
                <v-list-item v-for="select in selected" :key="select.id">
                  <v-list-item-title>
                    ชื่อ-สกุล: {{ select.firstname + ' ' + select.lastname }}
                    <br />
                    รหัสนักศึกษา: {{ select.id }}
                    <br />
                    GPAX: {{ select.gpax}}
                    <v-divider></v-divider>
                    <br />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title v-if="teach.text">อาจารย์: {{ teach.text }}</v-list-item-title>
                  <v-list-item-title v-else>อาจารย์: -</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="registerSave">เพิ่ม</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>

      <v-snackbar v-model="toggle">
        {{ message }}
        <v-btn text @click="toggle = false">ปิด</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";

export default {
  data: () => ({
    student: [],
    teacher: [],
    selected: [],
    teach: "",
    headers: [
      {
        text: "รหัสนักศึกษา",
        value: "id"
      },
      {
        text: "ชื่อ",
        value: "firstname"
      },
      {
        text: "สกุล",
        value: "lastname"
      },
      {
        text: "gpax",
        value: "gpax"
      },
      {
        text: "ปีการศึกษา",
        value: "year"
      }
    ],
    message: "",
    toggle: false,
    years: [],
    result: []
  }),
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    getTeacher: function(lecturer) {
      this.teach = lecturer;
    },
    getRegStudent: function() {
      this.$store.commit("setLoading", true);
      this.student = [];
      this.result = [];
      firebase
        .database()
        .ref("student")
        .on("child_added", snapshot => {
          this.student.push({
            id: snapshot.key,
            ...snapshot.val()
          });
        });
      firebase
        .database()
        .ref("result_register/" + this.$store.getters.getSchoolYear)
        .on("child_added", snapshot => {
          this.result.push(snapshot.val());
        });
      //eslint-disable-next-line
      console.log(this.result);
      this.result.forEach(res => {
        let remove = this.student.find(s => s.id === res.student);
        let index = this.student.indexOf(remove);
        this.student.splice(index, 1);
      });

      let fill = [];
      this.student.forEach(s => {
        if (s.year == this.$store.getters.getSchoolYear) {
          fill.push(s);
        }
      });
      console.log(fill);
      this.student = fill;
      this.$store.commit("setLoading", false);
    },
    registerSave: function() {
      if (this.selected && this.teach !== "") {
        this.selected.forEach(res => {
          this.result.push({
            gpax: res.gpax,
            student: res.id,
            teacher: this.teach.value
          });
        });

        firebase
          .database()
          .ref("result_register/" + this.$store.getters.getSchoolYear)
          .set(this.result);
        this.getRegStudent();
        this.message = "บันทึกสำเร็จ";
        this.toggle = true;
      } else {
        this.message = "ไม่สามารถบันทึกได้";
        this.toggle = true;
      }

      this.selected.forEach(se => {
        let remove = this.student.find(st => st.id === se.id);
        let index = this.student.indexOf(remove);
        this.student.splice(index, 1);
      });
      this.selected = [];
    }
  },
  created() {
    this.$store.commit("setLoading", true);
    this.$store.dispatch("settingYear", this.years);
    this.$store.dispatch("settingTeacher", this.teacher);
    firebase
      .database()
      .ref("student")
      .on("child_added", snapshot => {
        this.student.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });
    // eslint-disable-next-line
    console.log(this.student);
    firebase
      .database()
      .ref("result_register/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.result.push(snapshot.val());
      });
    // eslint-disable-next-line
    console.log(this.result);

    // find student registed for remove list
    this.result.forEach(res => {
      let remove = this.student.find(s => s.id === res.student);
      let index = this.student.indexOf(remove);
      this.student.splice(index, 1);
    });

    let fill = [];
    this.student.forEach(s => {
      if (s.year == this.$store.getters.getSchoolYear) {
        fill.push(s);
      }
    });
    console.log(fill);
    this.student = fill;

    firebase
      .database()
      .ref("result_register/" + this.$store.getters.getSchoolYear)
      .on("child_changed", () => {
        this.getRegStudent();
      });

    this.$store.commit("setLoading", false);
  }
};
</script>