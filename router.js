class Router {

    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegs){

        const matchedRoute = this._matchUrlToRoute(urlSegs);

        const url = `/${urlSegs.join('/')}`;
        history.pushState({},'this works', url);

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }

    _matchUrlToRoute(urlSegs) {
        const matchedRoute = this.routes.find(route => {
            
            const routePathSegs = route.path.split('/').slice(1);//Sacamos la informacion que esta despues del /

            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }

            return routePathSegs
                .every((routePathSegs, i) => routePathSegs === urlSegs[i])//.every Determina si todos los elementos en el array satisfacen una condición.
        });

        return matchedRoute;
    }

    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';

        this.loadRoute(...pathSegs);
    }

}