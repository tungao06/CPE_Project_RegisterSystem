<template>
  <v-container align-center justify-center fill-height align-content-center>
    <v-layout row>
      <v-card min-width="310">
        <v-card-title>อัปโหลดข้อมูลนักศึกษา</v-card-title>
        <v-card-text>
          <v-layout column>
            <v-flex xs12 sm6 md4 d-flex>
              <v-btn color="primary" width="100%" @click="handleUploadClick">Import</v-btn>
              <input
                type="file"
                ref="uploadFile"
                :accept="accept"
                v-show="false"
                @change="handleUploadChange"
              />
            </v-flex>
            <v-flex xs12 sm6 md4 d-flex>
              <v-btn color="error" class="mt-3" @click="fileInput = []" width="100%">Clear</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md4 d-flex>
              <v-btn color="success" class="mt-3" @click="importData" width="100%">นำเข้าข้อมูล</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="ml-3" min-width="900">
        <v-card-text>
          <v-flex>
            <v-simple-table>
              <thead>
                <tr>
                  <th>image</th>
                  <th>รหัสนักศึกษา</th>
                  <th>ชื่อ</th>
                  <th>สกุล</th>
                  <th>ปีการศึกษา</th>
                  <th>GPAX</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="file in fileInput" :key="file.รหัสนักศึกษา">
                  <td>
                    <img :src="file.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'" width="200" height="200">
                  </td>
                  <td>{{ file.รหัสนักศึกษา }}</td>
                  <td>{{ file.ชื่อ }}</td>
                  <td>{{ file.สกุล }}</td>
                  <td>{{ file.ปีการศึกษา }}</td>
                  <td>{{ file.GPAX }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-flex>
        </v-card-text>
        <v-snackbar v-model="snackbar">

        </v-snackbar>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
// import VCsvImport from "vue-csv-import";
import firebase from "firebase";
import XLSX from 'xlsx'

export default {
  props: {
    accept: {
      type: String,
      default: ".xlsx, .xls"
    }
  },
  data() {
    return {
      fileInput: [],
      dataFrame: {
        header: [],
        body: []
      },
      workbook: null,
      snackbar: null,
      message: ''
    };
  },
  methods: {
    importData: function() {
      if (this.fileInput.length > 0) {
        this.fileInput.forEach(data => {
          firebase
            .database()
            .ref("student/" + data.รหัสนักศึกษา)
            .set({
              image: data.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
              firstname: data.ชื่อ,
              lastname: data.สกุล,
              year: data.ปีการศึกษา,
              gpax: data.GPAX
            });
        });

        // generate student user
        this.fileInput.forEach(data => {
          firebase
            .database()
            .ref("student_login/" + data.รหัสนักศึกษา)
            .set({
              username: data.รหัสนักศึกษา,
              password: data.รหัสนักศึกษา.slice(4)
            });
        });
        this.fileInput = []
        this.message = "Upload สำเร็จ" 
      } else {
        this.message = "Upload ไม่สำเร็จ"
      }
      this.snackbar = !this.snackbar
    },

    readXlsx: function(convertData) {
      convertData.body.forEach(data => {
        this.fileInput.push(data);
      });
    },

    handleUploadClick: function() {
      this.clear();
      this.$refs.uploadFile.click();
    },
    handleUploadChange: function(event) {
      let files = event.target.files[0];
      this.convertWorkbook(files)
        .then(workbook => {
          let xlsxArray = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          this.workbook = workbook;
          this.initialTable(this.xlsxArrToTableArr(xlsxArray));
          this.readXlsx(this.dataFrame)
        })
        .catch(() => {
          this.$emit("SelectFile", false);
        });
    },
    convertWorkbook: function(file) {
      let reader = new FileReader();
      let fix = data => {
        let o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
          );
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      };
      return new Promise((resolve, reject) => {
        try {
          reader.onload = event => {
            let data = event.target.result;
            if (this.rABS) {
              resolve(XLSX.read(data, { type: "binary" }));
            } else {
              resolve(XLSX.read(btoa(fix(data)), { type: "base64" }));
            }
          };
          reader.onerror = error => {
            reject(error);
          };
          if (this.rABS) {
            reader.readAsBinaryString(file);
          } else {
            reader.readAsArrayBuffer(file);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    xlsxArrToTableArr: function(xlsxArray) {
      let tableArray = [],
        length = 0,
        maxLength = 0,
        maxLengthIndex = 0;
      xlsxArray.forEach((item, index) => {
        length = Object.keys(item).length;
        if (maxLength < length) {
          maxLength = length;
          maxLengthIndex = index;
        }
      });
      let tableHeader = Object.keys(xlsxArray[maxLengthIndex]);
      let row = {};
      xlsxArray.forEach(item => {
        row = {};
        for (let i = 0; i < maxLength; i++) {
          row[tableHeader[i]] = item[tableHeader[i]] || "";
        }
        tableArray.push(row);
      });
      return {
        header: tableHeader,
        data: tableArray
      };
    },
    tableArrToXlsxArr: function({ data, header }) {
      let xlsxArray = [];
      let temp = {};
      data.forEach(row => {
        temp = {};
        row.forEach((item, index) => {
          temp[header[index]] = item;
        });
        xlsxArray.push(temp);
      });
      return xlsxArray;
    },
    initialTable({ data, header }) {
      this.dataFrame.header = header;
      this.dataFrame.body = data;
      this.$emit("SelectFile", this.dataFrame);
    },
    clear: function() {
      this.$refs.uploadFile.value = null;
      this.dataFrame = {
        header: [],
        body: []
      };
      this.workbook = null;
    }
  }
};
</script>
