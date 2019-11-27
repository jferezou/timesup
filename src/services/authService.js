import router from '@/router/';
import internalApi from "@/api/internalApi";
import * as jwt_decode from 'jwt-decode';
import _ from "lodash";

const SESSION_STORAGE_TOKEN = "userToken";
const SESSION_EXPIRATION_DATE = "expirationDate";
const SESSION_ROLES = "roles";

export default {
    refreshPromise: null,
    /**
     * Fonction permettant de se connecter à eziscop
     * @param username
     * @param password
     * @param tenant
     */
    login: function (username, password) {
        const connectionInfos = {
            "username": username,
            "password": password
        };
        internalApi.authentication.login(connectionInfos).then(result => {
            const token = result.access_token;
            _saveNewToken(token);
            router.push({
                name: "home"
            })
        });
    },

    /**
     * Fonction permettant de se déconnecter à eziscop : reset le token et redirige vers la page de login
     */
    logout: function () {
        _resetToken();
        router.push({
            name: "home"
        });
    },

    /**
     * Fonction renvoyant une promise contenant un token valide :
     * - si le token est null, vide ou 'undefined' => renvoi une erreur
     * - si sa date d'expiration n'est pas passé => renvoi ce token
     * - sinon appelle le refresh et le rafraichi
     * @return {*}
     */
    getValidToken: function () {
        let currentToken = sessionStorage.getItem(SESSION_STORAGE_TOKEN);
        if (!_.isEmpty(currentToken) && "undefined" !== currentToken) {
            const now = Math.floor(Date.now() / 1000);
            const expiration_date = sessionStorage.getItem(SESSION_EXPIRATION_DATE);
            if (expiration_date < now) {
                // on utilise une variable unique refreshpromise pour ne pas lancer des refresh en //
                if (_.isNil(this.refreshPromise)) {
                    this.refreshPromise = Promise.resolve(internalApi.authentication.refresh()
                        .then(result => {
                            const token = result.access_token;
                            _saveNewToken(token);
                            this.refreshPromise = null;
                            return token;
                        })
                        .catch(err => {
                            this.refreshPromise = null;
                            this.logout();
                            return null;
                        })
                    );
                }
                return this.refreshPromise;
            }
            return Promise.resolve(currentToken);
        } else {
            return Promise.reject(new Error("Le token est null"));
        }
    },

    /**
     * Renvoi le token courant, qu'il soit valide ou non
     * @return {string}
     */
    getTokenWithoutRefresh: function () {
        return sessionStorage.getItem(SESSION_STORAGE_TOKEN);
    },

    /**
     * Renvoi le nom de l'utilisateur connecté
     * @return {Promise<T>}
     */
    getUsername: function () {
        return Promise.resolve(this.getValidToken()
            .then(token => {
                try {
                    const decoded_token = _decode_token(token);
                    return decoded_token.display_name;
                } catch (err) {
                    console.error("Erreur lors du decodage du token : " + err);
                    this.logout();
                    return err;
                }
            })
            .catch(this.logout));
    },

    /**
     * Redirige vers la page indiquant un accès non autorisé
     */
    unauthorized: function () {
        router.push('/unauthorized');
    },
    /**
     * Renvoi la liste de roles courante
     * @return {string[]}
     */
    getCurrentRoles: function () {
        return sessionStorage.getItem(SESSION_ROLES).split(",");
    },
};


/**
 * décode le token passé en paramètre
 * @param token
 * @return {*}
 * @private
 */
function _decode_token(token) {
    return jwt_decode(token);
}

/**
 * Supprime le token courant de la session ainsi que la date d'expiration et les rôles associés
 * @private
 */
function _resetToken() {
    sessionStorage.removeItem(SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(SESSION_EXPIRATION_DATE);
    sessionStorage.removeItem(SESSION_ROLES);
}

/**
 * Enregistre un nouveau token dans la session et maj la date d'expiration et les rôles
 * @param token
 * @private
 */
function _saveNewToken(token) {
    const decodedToken = _decode_token(token);
    sessionStorage.setItem(SESSION_STORAGE_TOKEN, token);
    sessionStorage.setItem(SESSION_EXPIRATION_DATE, decodedToken.exp);
    sessionStorage.setItem(SESSION_ROLES, decodedToken.rls);
}
