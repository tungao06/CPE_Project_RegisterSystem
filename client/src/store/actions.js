import firebase from 'firebase'
import api from "../API"
import router from '@/router'

export const actions = {
    // login handler
    loginAdmin({ commit }, payload) {
        var data = {
            username: payload.username,
            password: payload.password
        };
        commit('setLoading', true)
        api
            .post("/api/auth/signinAdmin", data, {
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => {

                if (response.data.accessToken) {
                    console.log(response.data.roles);
                    if (response.data.roles[0] == "ROLE_ADMIN") {
                        console.log(response.data.username);
                        console.log(response.data.accessToken);
                        localStorage.setItem('admin', JSON.stringify(response.data));
                        commit('setUser', payload.username)
                        router.push('/admin/' + payload.username)
                    } else {
                        console.log("Can't find admin account");
                        router.push('/home')
                    }
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() =>
                commit('setLoading', false))
    },
    loginTeacher({ commit }, payload) {
        var data = {
            username: payload.username,
            password: payload.password
        };
        commit('setLoading', true)
        api
            .post("/api/auth/signinTeacher", data, {
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => {

                if (response.data.accessToken) {
                    console.log(response.data.roles);
                    if (response.data.roles[0] == "ROLE_TEACHER") {
                        console.log(response.data.username);
                        console.log(response.data.accessToken);
                        localStorage.setItem('teacher', JSON.stringify(response.data));
                        commit('setUser', payload.username)
                        router.push('/teacher/' + payload.username)
                    } else {
                        console.log("Can't find teacher account");
                        router.push('/home')
                    }
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() =>
                commit('setLoading', false))
    },
    loginStudent({ commit }, payload) {
        var data = {
            username: payload.username,
            password: payload.password
        };
        commit('setLoading', true)
        api
            .post("/api/auth/signinUser", data, {
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => {

                if (response.data.accessToken) {
                    if (response.data.roles[0] == "ROLE_USER") {
                        console.log(response.data.username);
                        console.log(response.data.accessToken);
                        localStorage.setItem('user', JSON.stringify(response.data));
                        commit('setUser', payload.username)
                        router.push('/student/' + payload.username)
                    } else {
                        console.log("Can't find student account");
                        router.push('/home')
                    }
                }
            })
            .catch(error => {
                console.log(error);
                this.errored = true
            })
            .finally(() =>
                commit('setLoading', false))
    },

    // schoolyear
    createYear({ commit }, payload) {
        var data = {
            year: payload,
            status: false
        };
        commit('setLoading', true)
        api
            .post("/api/register", data, {
                headers: {
                    "content-type": "application/json"
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        commit('setLoading', false)
    },

    settingYear({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("schoolyear")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },
    updateYear({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('schoolyear').on('child_changed', snapshot => {
            const update = payload.find(year => year.id == snapshot.key)
            update.year = snapshot.val().year
            update.status = snapshot.val().status
        })
        commit('setLoading', false)
    },

    // teacher profile
    settingTeacherProfile({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("teacher_profile")
            .on("child_added", snapshot => {
                payload.push({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    },

    // teacher
    settingTeacher({ commit }, payload) {
        commit('setLoading', true)
        // beware variable in this structure
        firebase
            .database()
            .ref("teacher")
            .on("child_added", snapshot =>
                payload.push({
                    value: snapshot.key,
                    text:
                        snapshot.val().prefix +
                        " " +
                        snapshot.val().firstname +
                        " " +
                        snapshot.val().lastname
                })
            );
        commit('setLoading', false)
    },

    // student
    settingStudent({ commit }, payload) {
        commit('setLoading', true)
        firebase.database().ref('student').on('child_added', snapshot => {
            payload.push({
                id: snapshot.key,
                ...snapshot.val()
            })
        })
        commit('setLoading', false)
    },
    // teacher register
    teacherRegister({ commit }, payload) {
        commit('setLoading', true)
        if (payload.seat !== 0) {
            firebase.database().ref('teacher_register/' + payload.year + '/' + payload.user).set({
                seat: payload.seat,
                remain: payload.seat
            })
        }
        commit('setLoading', false)
    },

    //notice
    createNotice({ commit }, payload) {
        commit('setLoading', true);
        let date = new Date()
        firebase.database().ref('test_notice/').push({
            title: payload.title,
            information: payload.information,
            user: payload.user,
            imageUrl: payload.imageUrl,
            date:
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds()
        });
        commit('setLoading', false)
    },
    // createNoticeWithImage( {commit} , payload) {
    //     commit('setLoading', true)
    //     let date = new Date()
    //     const message = {
    //         title: payload.title,
    //         information: payload.information,
    //         user: payload.user,
    //         imageUrl:'',
    //         date:
    //           date.getDate() +
    //           "/" +
    //           (date.getMonth() + 1) +
    //           "/" +
    //           date.getFullYear() +
    //           " " +
    //           date.getHours() +
    //           ":" +
    //           date.getMinutes() +
    //           ":" +
    //           date.getSeconds()
    //     }
    //     let imageUrl
    //     let key
    //     let task
    //     firebase.database().ref('test_notice/').push(message)
    //         .then((data) =>{
    //             key = data.key
    //             return key
    //         })
    //         .then(key => {
    //             //const filename = payload.image.name
    //             //const ext = filename.slice(filename.lastIndexOf('.'))
    //              task = firebase.storage().ref('noticeImage/' + key).put(payload.image)
    //             return task
    //         })
    //         // get URL method.
    //         .then(() => {
    //             task.snapshot.ref.getDownloadURL().then((url) => {
    //                 this.imageUrl = url
    //                 // eslint-disable-next-line
    //                 //console.log(this.imageUrl)
    //                 return firebase.database().ref('test_notice').child(key).update({
    //                     imageUrl: this.imageUrl
    //                 })
    //             })
    //         })
    //         .then(() => {
    //             commit('createNotice', {
    //                 ...message,
    //                 imageUrl: imageUrl,
    //                 id: key
    //             })
    //         })
    //         .catch((error) => {
    //             // eslint-disable-next-line
    //             console.log(error)
    //           })
    //     commit('setLoading', false)
    // },
    showNotice({ commit }, payload) {
        commit('setLoading', true)
        firebase
            .database()
            .ref("test_notice")
            .on("child_added", snapshot => {
                payload.unshift({
                    id: snapshot.key,
                    ...snapshot.val()
                });
            });
        commit('setLoading', false)
    }
}