angular.module("app").factory("Session", [
    "$http",
    "$localStorage",
    "$sessionStorage",
    "IP",
    "$rootScope",
    "Upload",
    function SessionFactory(
        $http,
        $localStorage,
        $sessionStorage,
        IP,
        $rootScope,
        Upload
    ) {
        return {
            login: function(user) {
                return $http({
                    method: "POST",
                    url: IP + "/sessions",
                    data: { single: user },
                    skipErrorInterceptor: true
                });
            },
            isAuth: function() {
                try {
                    return $localStorage.auth.token != null;
                } catch (err) {
                    $localStorage.auth = {
                        token: null,
                        role: null,
                        user_id: null,
                        name: null,
                        email: null
                    };
                    return false;
                }
            },
            signUp: function(info) {
                return Upload.upload({
                    method: "POST",
                    url: IP + "/user",
                    data: info,
                    headers: this.getHeaders()
                });
            },
            setToken: function(token, role, headquarter_id, user_id, name, email, headquarter_name, sender_email, territory_id) {
                $localStorage.auth = {
                    token: token,
                    role: role,
                    headquarter: {
                        id: headquarter_id,
                        name: headquarter_name, 
                        sender_email, 
                        territory_id,
                    },
                    user_id: user_id,
                    name: name,
                    email: email,
                    mechanisms: []
                };
            },
            logout: function() {
                var token = this.getToken();
                // $http({
                //     method: "DELETE",
                //     url: IP + "/sessions",
                //     headers: { token: token }
                // })
                //     .success(function(data) {})
                //     .error(function(data) {});
                $localStorage.auth = {
                    token: null,
                    role: null,
                    user_id: null,
                    name: null,
                    email: null
                };
                $localStorage.layout = {
                    dashboard: null,
                    sidebar: null,
                };
                $rootScope.$broadcast("sessionDestroyed");
            },
            show: function() {
                return $http.get(IP + "/user", { headers: this.getHeaders() });
            },
            update: function(user) {
                return $http.put(IP + "/user", user, {
                    headers: this.getHeaders()
                });
            },
            updatePicture: function(usr) {
                return Upload.upload({
                    method: "PUT",
                    url: IP + "/user",
                    data: { profile_picture: usr },
                    headers: this.getHeaders()
                });
            },
            updatePassword: function(password) {
                return $http.put(IP + "/users/update_password", password, {
                    headers: this.getHeaders()
                });
            },
            isBusiness: function() {
                return this.isAuth() ? $localStorage.auth.role === 'business' : false;
            },
            getToken: function() {
                return this.isAuth() ? $localStorage.auth.token : false;
            },
            getRole: function() {
                return this.isAuth() ? $localStorage.auth.role : false;
            },
            getUserID: function() {
                return this.isAuth() ? $localStorage.auth.user_id : false;
            },
            getTerritoryID: function() {
                return this.isAuth() ? $localStorage.auth.headquarter.territory_id : false;
            },
            getHeadquarter: function() {
                return this.isAuth() ? $localStorage.auth.headquarter : false;
            },
            getHeadquarterID: function() {
                return this.isAuth() ? $localStorage.auth.headquarter.id : false;
            },
            getHeadquarterName: function() {
                return this.isAuth() ? $localStorage.auth.headquarter.name : false;
            },
            getHeadquarterSenderEmail: function() {
                return this.isAuth() ? $localStorage.auth.headquarter.sender_email : false;
            },
            getName: function() {
                return this.isAuth() ? $localStorage.auth.name : false;
            },
            setName: function(name) {
                $localStorage.auth.name = name
            },
            setHeadquarterMechanisms: function(mechanisms) {
                $localStorage.auth.mechanisms = mechanisms
            },
            getEmail: function() {
                return this.isAuth() ? $localStorage.auth.email : false;
            },
            getConciliators: function(body) {
                return $http.post(IP + "/coordinator/conciliators", body, {
                    headers: this.getHeaders()
                });
            },
            getHeaders: function() {
                return { Authorization: "Token token=" + this.getToken() };
            },
            forgotPassword: function(email, url) {
                var body = {email: email, url: url};
                return $http.post(IP + '/forget_password', body);
            },
            validateForgotPassToken: function(token) {
                return $http.get(IP + '/forget_password/' + token);
            },
            resetPassword: function(password, token) {
                var body = {password: password, token: token};
                return $http.delete(IP + '/forget_password', {params: body});
            },
            allWebNotifications: function (page) {
                return $http.get(IP + "/web_notifications?page="+ page, {
                    headers: this.getHeaders()
                });
            },
            notSeenWebNotifications: function () {
                return $http.get(IP + "/web_notifications/not_seen", {
                    headers: this.getHeaders()
                });
            }
        };
    }
]);
