<template>
  <v-container>
    <v-container row>
      <h6 class="title">จัดการปีการศึกษา</h6>
      <v-spacer></v-spacer>
      <AddYear :dialog="dialog" />
    </v-container>
    <v-data-table :headers="headers" :items="years" class="elevation-1" :items-per-page="5">
      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatus(item.status)" dark>
          <v-icon>mdi-brightness-5</v-icon>
        </v-chip>
      </template>
      <template v-slot:item.set="{ item }">
        <v-flex>
          <v-btn @click="setStatus(item)" outlined color="primary">
            <v-icon>mdi-content-save-edit</v-icon>
          </v-btn>
          <v-btn text color="error" style="display: none">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-flex>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from "firebase"
import AddYear from './parts/AddYear'

export default {
  components: {
    AddYear
  },
  data() {
    return {
      headers: [
        {
          text: "Year",
          value: "year"
        },
        {
          text: "status",
          value: "status"
        },
        {
          text: "setting",
          value: "set",
          width: 200
        }
      ],
      years: [],
      dialog: null
    };
  },
  created() {
    this.$store.dispatch("settingYear", this.years);
    this.$store.dispatch("updateYear", this.years);
  },
  methods: {
    getStatus(status) {
      if (status) return "green";
      return "red";
    },
    setStatus(item) {
      firebase
        .database()
        .ref("schoolyear/" + item.id)
        .set({
          year: item.year,
          status: !item.status
        });
    }
  }
};
</script>

