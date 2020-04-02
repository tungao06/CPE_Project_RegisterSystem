export const getters = {
    getUser (state) {
        return state.user
    },
    getSchoolYear (state) {
        return state.schoolYear
    },
    getLoading (state) {
        return state.loading
    },
    getError (state) {
        return state.error
    },
    getStudyYear (state) {
        return state.studyYear
    },
    getNotice(state){
        return state.noticeState
    }
}