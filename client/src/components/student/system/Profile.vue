<template>
  <v-container>
    <v-card max-width="510" class="mx-auto elevation-3">
      <v-card-title>{{ this.$store.getters.getUser }}</v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex>
            <v-avatar color="secondary" size="150">
              <img :src="profile.image" />
            </v-avatar>
          </v-flex>
          <v-flex>
            <h5 class="headline">{{ profile.fullname }}</h5>
            <h6 class="subtitle-1">Institude of Computer Engineering</h6>
            <v-spacer></v-spacer>
            <span class="body-1">GPAX {{ profile.gpax }}</span>
            <v-spacer></v-spacer>
            <span class="body-1">{{ profile.year }}</span>
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
      profile: {},
      user: this.$store.getters.getUser,
      profiles: []
    };
  },
  created() {
    this.$store.dispatch("settingStudent", this.profiles);
    this.profiles.forEach(value => {
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
  }
};
</script>

