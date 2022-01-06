import { createApp } from 'vue';
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
        { name: 'users', 
        path: '/users', 
        components: { default: UsersList, footer: UsersFooter }, 
        beforeEnter(to, from, next) {
            console.log('users beforeEnter');
            console.log(to, from);
            next();
        }
    },
        { path: '/:notFound(.*)', component: NotFound },
    ],
    scrollBehavior(_, _2, savedPosition) {
        return savedPosition && savedPosition || { left: 0, top: 0 }
    },
}); 

createApp(App).use(router).mount('#app')