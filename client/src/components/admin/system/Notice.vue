<template>
  <v-container>
    <v-container>
      <form>
        <v-responsive>
          <v-flex>
            <v-card class="mx-auto" max-width="70%" color>
              <v-toolbar color="primary">
                <v-toolbar-title>สร้างประกาศ</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="เรื่องประกาศ"
                    name="title"
                    type="text"
                    v-model="title"
                  ></v-text-field>

                  <v-textarea
                    outlined
                    name="information"
                    label="รายละเอียด"
                    type="text"
                    v-model="information"
                  ></v-textarea>
                </v-form>
                <div>
                  <v-btn
                    @click.native="selectFile"
                    v-if="!uploadEnd && !uploading">
                      add photo
                      <v-icon
                      right
                      aria-hidden="true">
                        
                      </v-icon>
                  </v-btn>
                  <form ref="form">
                    <input
                      id="files"
                      type="file"
                      name="file"
                      ref="uploadInput"
                      accept="image/*"
                      :multiple="false"
                      @change="detectFiles($event)" />
                  </form>
                  <v-progress-circular
                    v-if="uploading && !uploadEnd"
                    :size="100"
                    :width="15"
                    :rotate="360"
                    :value="progressUpload"
                    color="primary">
                    {{ progressUpload }}%
                  </v-progress-circular>
                  <img
                    v-if="uploadEnd"
                    :src="downloadURL"
                    width="50%" />
                  <div v-if="uploadEnd">
                    <v-btn
                      class="ma-0"
                      dark
                      small
                      color="error"
                      @click="deleteImage()"
                      >
                      Delete
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn @click="clearMessage" color="#abb2b9">Clear</v-btn>
                 <v-btn @click="storeMessage" color="primary">Post</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-responsive>
      </form>
    </v-container>
    
    <v-container dense v-for="(message, index) in notices" :key="index">
      <!---->
      <div v-if="message.user == user">
        <v-card class="mx-auto" max-width="70%">
          <!--color="#ffe4c4" -->
          <v-alert border="top" colored-border color="info accent-4" elevation="2">
          <v-responsive>
            <v-card-title>{{message.title}}</v-card-title>
             <v-card-text>&emsp;&emsp;{{message.information}}</v-card-text>
              <v-layout v-if="message.imageUrl != ''">
                <v-flex xs12 xm4 offset-sm1>
                  <img :src="message.imageUrl" height="400" width="600">
                </v-flex>
              </v-layout>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!--<v-btn depressed color="primary">Edit</v-btn>-->
              <v-btn depressed color="error" @click="deletePost(message.id,index)">Delete</v-btn>
            </v-card-actions>
          </v-responsive>
          </v-alert>
        </v-card>
      </div>
    </v-container>
  </v-container>
</template>


<script>
// eslint-disable-next-line
import firebase from 'firebase'


export default {
  data() {
    return {
      
      title: "",
      information: "",
      user: this.$store.getters.getUser,
      notices: [],
      progressUpload: 0,
      fileName: '',
      uploadTask: '',
      uploading: false,
      uploadEnd: false,
      downloadURL: '',
      studentStatus:[]
    };
  },
  methods: {
    storeMessage: function() {
      const messageData1 ={
          title: this.title,
          information: this.information,
          user: this.user,
          fileName: this.fileName,
          imageUrl: this.downloadURL
      }
      this.$store.dispatch("createNotice", messageData1)
      this.title = " "
      this.information = " "
      this.downloadURL = " "
      this.uploading = false
      this.uploadEnd = false

      this.NoticeStatus()
    },
    NoticeStatus:function(){
      this.studentStatus.forEach(student => {
        firebase.database().ref('noticeStatus/' + student.id).set({
          status: true
        })
      })
    },
    clearMessage: function() {
      this.title = " "
      this.information = " "
      this.downloadURL = " "
      this.deleteImage()
      this.uploading = false
      this.uploadEnd = false
    },
    selectFile () {
      this.$refs.uploadInput.click()
    },
    detectFiles (e) {
      let fileList = e.target.files || e.dataTransfer.files
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x])
      })
    },
    upload (file) {
      this.fileName = file.name
      this.uploading = true
      this.uploadTask = firebase.storage().ref('noticeImage/' + file.name).put(file)
    },
    deleteImage () {
        firebase.storage().ref('noticeImage/' + this.fileName).delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`file delete error occured: ${error}`)
        })
      this.$refs.form.reset()
    },
    deletePost(id,index){
      //console.log(id);
      firebase.database().ref('test_notice').child(id).remove()
      this.notices.splice(index,1)
      
    }
  },
  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
          this.$emit('downloadURL', downloadURL)
          //console.log(this.downloadURL)
        })
      })
    }
  
  },
  created() {
    this.$store.dispatch("showNotice", this.notices);

    firebase.database().ref("student").on("child_added", snapshot => {
          this.studentStatus.push({
                id: snapshot.key
                
          });
          //console.log(this.studentStatus);
      });
  }
};
</script>
<style>
.progress-bar {
  margin: 10px 0;
}
input[type="file"] {
  position: absolute;
  clip: rect(0,0,0,0);
}
</style>