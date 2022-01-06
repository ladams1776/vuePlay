import { createApp, nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams',
            path: '/teams',
            meta: { needsAuth: true },
            components: { default: TeamsList, footer: TeamsFooter },
            children: [
                {
                    name: 'team-members',
                    path: ':teamId',
                    component: TeamMembers,
                    props: true
                },
            ]
        },
        {
            name: 'users',
            path: '/users',
            components: { default: UsersList, footer: UsersFooter },
        },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    scrollBehavior(_, _2, savedPosition) {
        return savedPosition && savedPosition || { left: 0, top: 0 }
    },
});


router.beforeEach((to, from, next) => {
    // sending analytics data
    console.log(to, from);
    console.log('Global beforeEach');
    if (to.meta.needsAuth) {
        console.log('Needs auth!!')
        next();
    }
});

router.afterEach((to, from) => {
    // sending analytics data
    console.log(to, from);
    console.log('Global aftereach');
});

createApp(App).use(router).mount('#app')