<template>
  <v-container>
    <v-card class="elevation-3 mx-auto" width="600">
      <v-card-title>ข้อมูลปีการศึกษา</v-card-title>
      <v-card-text>
        <v-layout column wrap align-start>
          <v-row justify="space-around">
            <v-col class="d-flex" cols="12" sm="4">
              <v-select
                v-model="selectYear"
                :items="year"
                item-text="id"
                item-value="id"
                label="เลือกปีการศึกษา"
                dense
                outlined
                @change="showList"
              ></v-select>
            </v-col>              
            <Seat :dialog="dialog"></Seat>
  
            <vue-json-to-csv
              :csv-title="csvTitle"
              :json-data="studentRegister"
              :labels="{id: {title: 'รหัสนักศึกษา'}, 
                        name: {title: 'ชื่อ-นามสกุล'},
                        gpax: {title: 'เกรดเฉลี่ย'},
                      }"
                    @success="val => handleSuccess(val)"
                    @error="val => handleError(val)"
                  >
              <v-btn color="info">
                <v-icon>mdi-cloud-download-outline</v-icon>Download
              </v-btn>
            </vue-json-to-csv>
          </v-row>
                     
          <v-flex>
            <v-data-table :headers="headers" :items="studentRegister" :sort-by="['id']"></v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
import firebase from 'firebase'
import Seat from "./parts/Seat";
import VueJsonToCsv from "vue-json-to-csv";

export default {
  components: {
    Seat,
    VueJsonToCsv
  },
  data() {
    return {
      dialog: null,
      selectYear: '',
      user: this.$store.getters.getUser,
      headers: [
        {text: "รหัสนักศึกษา", value: "id"},
        {text: "ชื่อ - สกุล", value: "name"},
        {text: "GPAX",value: "gpax"}
      ],
      studentRegister:[],
      year:[],
      studentId:[],
      csvTitle: 'CPE-Project Register_Student-List'
    };
  },
  methods:{
    showList:function(){
       this.$store.commit("setLoading", true);
       this.studentRegister = [];
       this.studentId = [];
      
      firebase
      .database()
        .ref("result_register/" + this.selectYear)
        .orderByChild('teacher')
        .equalTo(this.user)
        .on("child_added", snapshot => {
          //this.registerList.push(snapshot.val())
          this.studentId.push(snapshot.val().student) 
        })

        this.findStudent()       
        console.log(this.studentRegister);
        console.log(this.selectYear);
        console.log(this.studentId);  
        //console.log(this.user);
    },
    findStudent:function(){
      for(let i = 0; i < this.studentId.length; i++) {
        firebase
            .database()
            .ref("student/" + this.studentId[i])
            .once("value")
            .then(snapshot => {
              this.studentRegister.push({
                name: snapshot.val().firstname + " " + snapshot.val().lastname,
                id: this.studentId[i],
                gpax: snapshot.val().gpax
              })
           
            });
      }
    },
  },
  mounted() {
    firebase
      .database()
        .ref("data_school_year")
          .on("child_added", snapshot => {
            this.year.push({ id: snapshot.key })
          })
  },
  
};
</script>
