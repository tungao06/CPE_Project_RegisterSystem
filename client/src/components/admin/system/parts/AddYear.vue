<template>
  <v-dialog v-model="dialog" width="300">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">เพิ่มปีการศึกษา</v-btn>
    </template>
    <v-card>
      <v-card-title color="primary">เพิ่มปีการศึกษา</v-card-title>
      <v-card-text>
        <v-flex justify-center align-center fill-height>
          <v-text-field v-model="year" placeholder="e.g. 2558" outlined @keyup.enter="addYear(year)"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="addYear(year)" color="success">เพิ่ม</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      year: null
    };
  },
  methods: {
    addYear: function(year) {
      this.$store.dispatch("createYear", year);
      this.dialog = !this.dialog;
    }
  }
};
</script>

