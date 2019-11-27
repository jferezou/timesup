import Vue from 'vue'
import Router from 'vue-router'
import MainAppView from "@/views/MainAppView.vue";
import Upload from "@/components/TicketUpload.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                isNotProtectedByAuthentication: true,
            }
        },
        {
            path: '/',
            name: 'main',
            component: MainAppView,
            children: [
                {
                    path: "/upload",
                    name: "upload",
                    component: Upload,
                    meta: {
                        isNotProtectedByAuthentication: true,
                    }
                },
                {
                    path: "/home",
                    name: "home",
                    component: Home,
                    meta: {
                        isNotProtectedByAuthentication: true,
                    },
                },
            ]
        }
    ]
});
//
//
// router.beforeEach(function (to, from, next) {
//     if (!to.meta.isNotProtectedByAuthentication) {
//         // si le token est valide, on continue
//         authService.getValidToken()
//             .then(result => {
//                 // on verifie les rôles
//                 if (!_.isNil(to.meta.authorizedRoles)) {
//                     const currentRoles = authService.getCurrentRoles();
//                     const rolesIntersection = _.intersection(to.meta.authorizedRoles, currentRoles);
//                     if (!_.isEmpty(rolesIntersection)) {
//                         next();
//                     } else {
//                         console.log("Accès non authorisé lors du routage de la page " + from.fullPath + " vers la page " + to.fullPath);
//                         authService.unauthorized();
//                     }
//                 } else {
//                     next();
//                 }
//             })
//             .catch(err => {
//                 console.error("Erreur lors du routage de la page " + from.fullPath + " vers la page " + to.fullPath + " : " + err);
//                 authService.logout();
//             });
//     } else {
//         // la page ne requiert pas d'autentification
//         next();
//     }
// });

export default router;
