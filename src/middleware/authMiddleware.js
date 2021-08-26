function middlewarePipeline(context, middleware, index) {
    const nextMiddleware = middleware[index]

    if (!nextMiddleware) {
        return context.next
    }

    return () => {
        const nextPipeline = middlewarePipeline(
            context, middleware, index + 1
        )

        nextMiddleware({ ...context, next: nextPipeline })

    }
}

export default function authMiddleware(router, store) {
    router.beforeEach((to, from, next) => {
        let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        let requiresNonLogged = to.matched.some(record => record.meta.requiresNonLogged);
        let loggedIn = store.getters.userState.loggedIn;

        if (requiresAuth && !loggedIn) {
            return next({ name: 'Login' });
        }

        if (requiresNonLogged && loggedIn) {
            return next({ name: 'Dashboard' });
        }

        if (!to.meta.middleware) {
            return next()
        }

        const middleware = to.meta.middleware;

        const context = { to, from, next, store }

        return middleware[0]({
            ...context,
            next: middlewarePipeline(context, middleware, 1)
        })
    })
}

