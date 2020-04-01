import Vue from 'vue'
import Router from 'vue-router'
import MainAppView from "@/views/MainAppView.vue";
import AddNewName from "@/components/AddNewName.vue";
import NewRound from "@/components/NewRound.vue";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: MainAppView,
            children: [
                {
                    path: "/addnewname",
                    name: "addNewName",
                    component: AddNewName,
                },
                {
                    path: "/new-round",
                    name: "new-round",
                    component: NewRound,
                },
            ]
        }
    ]
});

export default router;
