export const mutations = {
    setUser(state, payload) {
        state.user = payload
    },
    setSchoolYear(state, payload) {
        state.schoolYear = payload
    },
    setLoading(state, payload) {
        state.loading = payload
    },
    setError(state, payload) {
        state.error = payload
    },
    setStudyYear(state, payload) {
        state.studyYear = payload
    },
    createNotice(state, payload) {
        state.noticeState = payload

    }
}