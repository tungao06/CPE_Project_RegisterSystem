<template>
  <v-container>
    <v-card max-width="510" class="mx-auto elevation-3">
      <v-card-title>เลือกอาจารย์ที่ปรึกษา</v-card-title>
      <v-card-text>
        <v-layout column>
          <v-flex>
            <v-select :label="i+1" :items="teachers" v-for="(teacher, i) in teachers" :key="i" v-model="selected[i]"></v-select>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.prevent="notDuplicate">ยืนยันการเลือก</v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="duplicateError" color="error">
      ยังไม่ได้เลือกหรือเลือกซ้ำ
      <v-btn text @click="duplicateError = false">ปิด</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
/**
 * Uncleaned code
 * Becareful this component
 *
 */
import firebase from "firebase";

export default {
  data() {
    return {
      teachers: [],
      students: [],
      user: this.$store.getters.getUser,
      profile: {},
      selected: [],
      project: [],
      duplicateError: false,
      register: []
    };
  },
  methods: {
    // function validation of select lecturer non duplicate lecturer and non duplicate selected
    notDuplicate: function() {
      let date = new Date()
      this.project = [
        ...new Set(this.selected)
      ];
      if (this.project.length === this.teachers.length) {
        firebase
          .database()
          .ref("lecturer_register/" + this.profile.year + '/' + this.user)
          .set({
            teacher: this.project,
            student: this.user,
            gpax: this.profile.gpax,
            date:
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " " +
              date.getHours() +
              ":" +
              date.getMinutes() +
              ":" +
              date.getSeconds()
          });
      } else {
        this.duplicateError = true;
      }
    }
  },
  created() {
    this.$store.dispatch("settingStudent", this.students);
    this.$store.dispatch("settingTeacher", this.teachers);

    this.students.forEach(value => {
      if (value.id === this.user) {
        this.profile = {
          fullname: value.prefix + " " + value.firstname + " " + value.lastname,
          gpax: value.gpax,
          year: value.year,
          image: value.image
        };
        return;
      }
    });
    /* eslint-disable */ 
    firebase.database().ref('teacher_register/' + this.profile.year)
      .on('child_added', snapshot => {
        this.register.push(snapshot.key)
        console.log(this.register)
      })

    let filterTeacher = []
    this.teachers.forEach(snapshot => {
      for (let i = 0; i < this.register.length; i++) {
        if (snapshot.value === this.register[i]) {
          filterTeacher.push({
            value: snapshot.value,
            text: snapshot.text
          })
          break
        }
      }
    })

    this.teachers = filterTeacher
  }
};
</script>
