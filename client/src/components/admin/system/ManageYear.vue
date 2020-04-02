<template>
  <v-container>
    <v-container column>
      <h6 class="title">ข้อมูลปีการศึกษา {{ this.$store.getters.getSchoolYear }}</h6>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 md4 d-flex>
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" outlined dark v-on="on" class="elevation-1">เลือกปีการศึกษา</v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="year in years"
                :key="year.id"
                @click="getYear(year.year)"
                @change="getStudentRegister"
              >
                <v-list-item-title>{{ year.year }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 sm6 md4 d-flex>
          <v-btn
            color="primary"
            class="mx-auto"
            @click="resultRegister"
            :loading="loadingRank"
          >จัดที่นักศึกษา</v-btn>
          <v-btn color="primary" class="mx-auto" @click="statisticData">เก็บข้อมูลการจัดอันดับ</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <v-simple-table>
      <thead>
        <tr>
          <th>ปีการศึกษา</th>
          <th>นักศึกษา</th>
          <th>นักศึกษาลงทะเบียน</th>
          <th>อาจารย์</th>
          <th>อาจารย์ลงทะเบียน</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reg in showRegister" :key="reg.id">
          <td>{{ reg.id }}</td>
          <td>{{ reg.student }}</td>
          <td>{{ reg.student_register }}</td>
          <td>{{ reg.teacher }}</td>
          <td>{{ reg.teacher_register }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-snackbar v-model="warningResult">
      จัดอันดับแล้ว
      <v-btn @click="warningResult = false" text>ปิด</v-btn>
    </v-snackbar>
    <v-snackbar v-model="warningStat">
      เก็บข้อมูลการจัดอันดับแล้ว
      <v-btn @click="warningStat = false" text>ปิด</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      years: [],
      result: [],
      register: [],
      showRegister: [],
      // teacher register
      teacherRegister: [],
      // lecturer register
      studentRegister: [],
      teacherCount: [],
      warningResult: false,
      warningStat: false,
      loadingRank: false,
      loadingStat: false
    };
  },
  methods: {
    getYear: function(year) {
      this.$store.commit("setSchoolYear", year);
    },
    getStudentRegister: function() {
      this.studentRegister = [];
      firebase
        .database()
        .ref("lecturer_register/" + this.$store.getters.getSchoolYear)
        .on("child_added", snapshot => {
          this.studentRegister.push({
            id: snapshot.key,
            ...snapshot.val()
          });
        });

      // eslint-disable-next-line
      console.log(this.studentRegister);
    },
    statisticData: async function() {
      this.loadingStat = true;
      await firebase
        .database()
        .ref("result_register/" + this.$store.getters.getSchoolYear)
        .on("child_added", snapshot => {
          this.register.push(snapshot.val());
          this.teacherCount.push(snapshot.val().teacher);
        });
      // unique teacher
      this.teacherCount = await [...new Set(this.teacherCount)];
      for (var i = 0; i < this.teacherCount.length; i++) {
        let maxGpax = 0,
          minGpax = 4,
          count = 0,
          mean = 0,
          teacher = null;
        await this.register.forEach(snapshot => {
          if (snapshot.teacher === this.teacherCount[i]) {
            teacher = snapshot.teacher;
            if (maxGpax < snapshot.gpax) {
              maxGpax = snapshot.gpax;
            }
            if (minGpax > snapshot.gpax) {
              minGpax = snapshot.gpax;
            }
            mean += snapshot.gpax;
            count++;
          }
        });
        mean = mean / count;
        await firebase
          .database()
          .ref("statistic/" + this.$store.getters.getSchoolYear + "/" + teacher)
          .set({
            register: count,
            max: maxGpax,
            min: minGpax,
            mean: mean
          });

        // *****************************************************************************
      }
      let regStudent = [];
      await firebase
        .database()
        .ref("lecturer_register/" + this.$store.getters.getSchoolYear)
        .on("child_added", snapshot => {
          regStudent.push({
            id: snapshot.key,
            ...snapshot.val()
          });
        });
      // data school year
      let cTeacher = 0,
        cStudent = 0;
      await firebase
        .database()
        .ref("teacher")
        .on("child_added", () => {
          cTeacher++;
        });
      await firebase
        .database()
        .ref("student")
        .on("child_added", () => {
          cStudent++;
        });
      let dataYear = {
        student_register: regStudent.length,
        teacher_register: this.teacherCount.length,
        student: cStudent,
        teacher: cTeacher
      };

      await firebase
        .database()
        .ref("data_school_year/" + this.$store.getters.getSchoolYear)
        .set(dataYear)
        .then(() => {
          this.loadingStat = false;
          this.warningStat = true;
        });
      this.register = [];
    },
    resultRegister: async function() {
      /**
       * Very Difficult
       */
      this.loadingRank = true;
      let remainer = true;
      await this.studentRegister.forEach(student => {
        for (let i = 0; i < student.teacher.length; i++) {
          let teacher = this.teacherRegister.find(
            teach => teach.id === student.teacher[i]
          );
          if (teacher === undefined) {
            // eslint-disable-next-line
            console.log("continue");
            continue;
          }
          // eslint-disable-next-line
          console.log(teacher);
          if (Number(teacher.remain) !== 0) {
            this.result.push({
              student: student.id,
              teacher: teacher.id,
              gpax: student.gpax
            });
            // set remain decrease by 1
            Number(teacher.remain--);
            break;
          } else if (i === student.teacher.length - 1) {
            remainer = false;
          }
        }

        // if every teacher seat remain = 0
        if (!remainer) {
          this.teacherRegister.sort((a, b) => {
            return a["seat"] - b["seat"];
          });
          this.result.push({
            student: student.id,
            teacher: this.teacherRegister[0].id,
            gpax: student.gpax
          });
          this.teacherRegister[0].seat++;
        }
      });

      await firebase
        .database()
        .ref("result_register/" + this.$store.getters.getSchoolYear)
        .set({ ...this.result })
        .then(() => {
          this.warningResult = true;
        });
      this.loadingRank = false;
    }
  },
  created() {
    this.$store.dispatch("settingYear", this.years);
    firebase
      .database()
      .ref("teacher_register/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.teacherRegister.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });

    firebase
      .database()
      .ref("lecturer_register/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.studentRegister.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });
    /*
     * multiple sort by GPAX and Date
     * GPAX greatest to least
     * Date before to after
     */
    this.studentRegister.sort((a, b) => {
      return b["gpax"] - a["gpax"] || a["date"] - b["date"];
    });

    // eslint-disable-next-line
    console.log(this.studentRegister);
    firebase
      .database()
      .ref("data_school_year")
      .on("child_added", snapshot => {
        this.showRegister.push({
          id: snapshot.key,
          ...snapshot.val()
        });
      });
  }
};
</script>
