<template>
  <v-container>
    <v-container row>
      <h6 class="title">สถิติการลงทะเบียน</h6>
      <v-spacer></v-spacer>

      <vue-json-to-csv
        :csv-title="csvTitle"
        :json-data="records"
        :labels="{teacher: {title: 'teacher'}, 
                    register: {title: 'register'},
                    max: {title: 'max'},
                    min: {title: 'min'},
                    mean: {title: 'mean'}}"
        @success="val => handleSuccess(val)"
        @error="val => handleError(val)"
      >
        <v-btn color="info">
          <v-icon>mdi-cloud-download-outline</v-icon>Download
        </v-btn>
      </vue-json-to-csv>
    </v-container>
    <v-data-table :headers="headers" :items="records" class="elevation-1" :items-per-page="5"></v-data-table>
    <v-divider></v-divider>
    <h3 class="display-2 text-center">ลงทะเบียน</h3>
    <line-chart :data="register" :height="200" :options="options"/>
    <v-divider></v-divider>
    <h3 class="display-2 text-center">MAX GPAX</h3>
    <line-chart :data="max" :height="200" :options="options"/>
    <v-divider></v-divider>
    <h3 class="display-2 text-center">MIN GPAX</h3>
    <line-chart :data="min" :height="200" :options="options"/>
    <v-divider></v-divider>
    <h3 class="display-2 text-center">MEAN GPAX</h3>
    <line-chart :data="mean" :height="200" :options="options"/>
  </v-container>
</template>

<script>
import VueJsonToCsv from "vue-json-to-csv";
import LineChart from "./parts/line-chart";
import firebase from "firebase";

export default {
  components: {
    VueJsonToCsv,
    LineChart
  },
  data() {
    return {
      teachers: [],
      headers: [
        {
          text: "อาจารย์ที่ปรึกษา",
          value: "teacher"
        },
        {
          text: "จำนวนนักศึกษาลงทะเบียน",
          value: "register"
        },
        {
          text: "Max GPAX",
          value: "max"
        },
        {
          text: "Min GPAX",
          value: "min"
        },
        {
          text: "Mean GPAX",
          value: "mean"
        }
      ],
      records: [],
      register: {
        labels: ["ลงทะเบียน"],
        datasets: []
      },
      max: {
        labels: ["max"],
        datasets: []
      },
      min: {
        labels: ["min"],
        datasets: []
      },
      mean: {
        labels: ["mean"],
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      csvTitle: 'statistic' + new Date()
    };
  },
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
    // eslint-disable-next-line
    console.log(this.teachers);

    firebase
      .database()
      .ref("statistic/" + this.$store.getters.getSchoolYear)
      .on("child_added", snapshot => {
        this.teachers.forEach(element => {
          if (element.value === snapshot.key) {
            let colorGraph = "#" + Math.floor(Math.random() * 16777215).toString(16)
            // record in table
            this.records.push({
              teacher: element.text,
              register: snapshot.val().register,
              max: snapshot.val().max,
              min: snapshot.val().min,
              mean: snapshot.val().mean
            });
            // record in graph
            this.register.datasets.push({
              label: element.text,
              backgroundColor: colorGraph,
              data: [snapshot.val().register]
            });
            this.max.datasets.push({
              label: element.text,
              backgroundColor: colorGraph,
              data: [snapshot.val().max]
            });
            this.min.datasets.push({
              label: element.text,
              backgroundColor: colorGraph,
              data: [snapshot.val().min]
            });
            this.mean.datasets.push({
              label: element.text,
              backgroundColor: colorGraph,
              data: [snapshot.val().mean]
            });
          }
        });
      });
    /* eslint-disable */
    console.log(this.records);
    console.log(this.render);
  }
};
</script>
