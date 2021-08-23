export default function ifLoggedInDashboardElseNext({ next, store }) {
    if (store.getters.userState.loggedIn) {
        return next({ name: 'Dashboard' })
    }

    return next();
}