<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-card>
        <v-card-title>ผลการเลือกอาจารย์ที่ปรึกษา</v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-action>
                <v-icon>mdi-checkbox-blank-circle</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ teacher.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      result: {},
      profiles: [],
      regis: [],
      register: {},
      teacher: {}
    };
  },
  created() {
    this.$store.dispatch("settingStudent", this.profiles);

    for (let i = 0; i < this.profiles.length; i++) {
      if (this.$store.getters.getUser === this.profiles[i].id) {
        this.result = this.profiles[i];
        break;
      }
    }

    firebase
      .database()
      .ref("result_register/" + this.result.year)
      .on("child_added", snapshot => {
        this.regis.push({ ...snapshot.val() });
      });

    this.regis.forEach(snapshot => {
      if (snapshot.student === this.$store.getters.getUser) {
        this.register = {
          student: snapshot.student,
          teacher: snapshot.teacher,
          gpax: snapshot.gpax
        };
      }
    });

    firebase
      .database()
      .ref("teacher/" + this.register.teacher)
      .once("value")
      .then(snapshot => {
        this.teacher = {
          name:
            snapshot.val().prefix +
            " " +
            snapshot.val().firstname +
            " " +
            snapshot.val().lastname
        };
      });
  }
};
</script>
