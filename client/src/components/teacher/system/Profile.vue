<template>
  <v-container>
    <v-container>
      <v-card class="elevation-3 mx-auto" max-width="510">
        <v-card-title>โปรไฟล์</v-card-title>
        <v-card-text>
          <v-layout column wrap align-start>
            <v-flex xs12 sm6>
              <v-img height="300" width="300" :src="image"></v-img>
              <v-spacer></v-spacer>
              <h3>
                <b>Email :</b>
              </h3>
              {{email}}
              <h3>
                <b>Professionals :</b>
              </h3>
              {{ professionals }}
              <h3>
                <b>ProjectTopics :</b>
              </h3>
              {{ topics }}
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn raised color="primary" @click="editButton = !editButton">แก้ไข</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container>
      <v-card class="mx-auto" max-width="40%" color v-if="editButton">
        <v-toolbar color="primary">
          <v-toolbar-title>แก้ไขโปรไฟล์</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field outlined label="ImageURL" name="imageURL" type="text" v-model="image"></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-text>
          <v-form>
            <v-text-field outlined label="email" name="email" type="text" v-model="email"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-text>
          <v-textarea
            outlined
            label="ความเชี่ยวชาญ"
            name="pro"
            type="text"
            auto-grow
            v-model="professionals"
          ></v-textarea>
        </v-card-text>

        <v-card-text>
          <v-textarea
            outlined
            label="หัวข้อโปรเจค"
            name="topic"
            type="text"
            auto-grow
            v-model="topics"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error">ยกเลิก</v-btn>
          <v-btn @click="updateProfile" color="primary">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
/* eslint-disable */
import api from "../../../API";
import router from "@/router";
export default {
  data() {
    return {
      profiles: [],
      professionals: "",
      topics: "",
      image: "",
      email: "",
      profileInput: [],
      editButton: true
    };
  },
  methods: {
    updateProfile() {
      let user = JSON.parse(localStorage.getItem("teacher"));
      /* eslint-disable no-console */
      console.log(this.image);
      console.log(this.email);
      console.log(this.topics);
      console.log(this.professionals);
      /* eslint-enable no-console */
      api
        .put(
          "/api/teacher",
          {
            username: user.username,
            image: this.image,
            email: this.email,
            header: this.topics,
            professional: this.professionals
          },
          {
            headers: {
              "content-type": "application/json",
              "x-access-token": user.accessToken
            }
          }
        )
        .then(response => {
          /* eslint-disable no-console */
          console.log(response);
          /* eslint-enable no-console */
        })
        .catch(error => {
          /* eslint-disable no-console */
          console.log(error);
          /* eslint-enable no-console */
          this.errored = true;
        });
    }
  }

  // created() {
  //   this.$store.dispatch("settingTeacherProfile", this.profiles);
  //   // eslint-disable-next-line
  //   //console.log(this.user)
  //   this.profiles.forEach(value => {
  //     if (value.id === this.user) {
  //       this.professionals = value.professional;
  //       this.topics = value.header;
  //       this.image = value.image;
  //       this.email = value.email;
  //     }
  //   });
  // }
};
</script>
