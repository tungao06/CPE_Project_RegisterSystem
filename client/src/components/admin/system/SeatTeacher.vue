<template>
  <v-app>
    <v-container>
      <h6 class="title">จัดการอาจารย์ที่ปรึกษา {{ this.$store.getters.getSchoolYear }}</h6>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-list-item-title justify-space-around align-baseline>
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
                <v-list-item v-for="year in years" :key="year.id" @click="getYear(year.year)">
                  <v-list-item-title>{{ year.year }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-combobox :items="teachers" v-model="teacher" label="อาจารย์ที่ปรึกษา"></v-combobox>
            <v-text-field type="number" v-model="seat" label="จำนวนที่นั่ง"></v-text-field>
          </v-list-item-title>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="setSeat">จัดที่นั่ง</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{ message }}
        <v-btn text @click="snackbar = false">ปิด</v-btn>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    teachers: [],
    years: [],
    seat: null,
    teacher: null,
    snackbar: false,
    message: ""
  }),
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
    this.$store.dispatch("settingYear", this.years);
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    setSeat: function() {
      firebase
        .database()
        .ref(
          "teacher_register/" +
            this.$store.getters.getSchoolYear +
            "/" +
            this.teacher.value
        )
        .set({
          seat: this.seat,
          remain: this.seat
        })
        .then(() => {
          this.message = "จัดที่นั่งแล้ว";
          this.snackbar = !this.snackbar;
        });
    }
  }
};
</script>