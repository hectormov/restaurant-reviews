

if(!navigator.serviceWorker) {
    //If it doesn't exist, do nothing.
}
else {
    navigator.serviceWorker.register(location.pathname + 'sw.js');
}