<template>
  <v-container>
    <v-card class="elevation-3 mx-auto" max-width="800">
      <v-card-title>ข้อมูลอาจารย์ที่ปรึกษา</v-card-title>
      <v-card-text>
        <v-layout wrap align-start column>
          <v-flex xs12 sm6 d-flex align-baseline align-content-space-around>
            <v-select label="เลือกอาจารย์ที่ปรึกษา" v-model="teacher" :items="teachers" @change="filterTeacher"></v-select>
            <v-spacer class="ml-3"></v-spacer>
          </v-flex>
          <v-flex v-show="display">
            <v-img :src="image" width="200" height="250"></v-img>
            <h6 class="title">ความเชี่ยวชาญ</h6>
            <v-list dense v-for="pro in professional" :key="pro">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ pro }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <h6 class="title">หัวข้อโปรเจค</h6>
            <v-list dense v-for="head in header" :key="head">
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-checkbox-blank-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ head }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      teacher: null,
      teachers: [],
      profiles: [],
      header: [],
      professional: [],
      display: false,
      image: ''
    };
  },
  methods: {
    filterTeacher: function() {
      this.profiles.forEach(element => {
        if (element.id === this.teacher) {
          this.header = element.header;
          this.professional = element.professional;
          this.image = element.image
          return;
        }
      });
      this.display = true;
    }
  },
  created() {
    this.$store.dispatch("settingTeacher", this.teachers);
    this.$store.dispatch("settingTeacherProfile", this.profiles);
  }
};
</script>

