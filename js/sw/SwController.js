
// class SWorker {
//     constructor() {
//     }
//     _registerServiceWorker() {
if(!navigator.serviceWorker) {
    //If it doesn't exist, do nothing.
}
else {
    navigator.serviceWorker.register('/sw.js');
}


// let sWorker = new SWorker;
// sWorker._registerServiceWorker();
