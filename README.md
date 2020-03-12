# AngularArchitectureStarter

-- tips on : https://medium.com/@tomastrajan/how-to-build-epic-angular-app-with-clean-architecture-91640ed1656

github demo:
https://github.com/tomastrajan/angular-ngrx-material-starter

# Process
1) Install workspace
ng new angular-architecture-example --create-application false --strict

2) Create new app inside - prefix will be added on all elements to differentiate from 3rd parties:
ng g application my-epic-app --prefix my-org --style scss --routing

3) Optional but recommended : Add angular Material
ng add @angular/material
Custom theming added: https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1

4) Optional - prettier:
npm i -D prettier
also add:
npm i -D tslint-config-prettier (add to tslint)

4.1) Add scripts to package json for formatting
"format:test": "prettier \"projects/**/*.{ts,html,md,scss,json}\" --list-different",
"format:write": "prettier \"projects/**/*.{ts,html,md,scss,json}\" --write",

5) Webpack Bundle Analyzer
It can help us understand content of the Javascript bundles produced during the prod build which is very useful when debugging correct structure and hence architecture of our app!
5.1) Add new script
"analyze": "ng build --prod --stats-json && webpack-bundle-analyzer ./dist/my-epic-app/stats-es2015.json

now we can test this with
npm run analyze

# Run App and open it
ng serve -o

# ARHITECTURE
<h3> Eager part </h3>
<ul>
<li>App Module</li>
<li>App Routing Module</li>
<li>Core Module</li>
</ul>
<h3> Lazy Loaded </h3>
<ul>
<li>Shared Module</li>
<li>Lazy Feature A</li>
<li>Lazy Feature B</li>
</ul>

# CORE
-- inside desired project src/app folder:
CoreModule will be for everything you would add to App Module

# Top Level lazy modules
Create lazy loaded top level module
ng g m features/home --route home --module app.module.ts
HOME and ADMIN modules
- they have their own module and router modules
- Top level lazy modules are imported inside app-routing.module but sub nested modules import in lazy loaded module parent

# SHARED
Contains as many reusable modules as you may need e.g. Material elements
Take note not to provide their lazily loaded (included ) services in 'root' but in module providers
-- Also if they have global styles create importable scss file e.g. _demo-badge.scss

# CORE SERVICES and interceptors
<h5>Http Interceptor</h5>
<h5>Err Handler service</h5>
<h5>Local storage service </h5>
<p>Run in app component ngOnInit via testLocalStorage() method </p>
<h5>Notification service</h5>

# NGRX Store
<h3>Core Store</h3>
core-store folder - also contains router store importend in core.state.ts
-- core state be like:
export interface AppState {
    auth: AuthState;
    settings: SettingsState;
    router: RouterReducerState<RouterStateUrl>;
}
<h4>Auth</h4>
Nested in core module has its own store and models
<h4>Settings store</h4>
-- settings effects combine actions and selectors
-- take note of persistSettingsToLocalStorage$ effect he listens to actions to store them to local storage e.g. current theme