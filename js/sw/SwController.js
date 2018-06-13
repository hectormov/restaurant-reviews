
// class SWorker {
//     constructor() {
//     }
//     _registerServiceWorker() {
if(!navigator.serviceWorker) {
    //If it doesn't exist, do nothing.
}
else {
    navigator.serviceWorker.register(location.pathname + 'sw.js');
}


// let sWorker = new SWorker;
// sWorker._registerServiceWorker();
