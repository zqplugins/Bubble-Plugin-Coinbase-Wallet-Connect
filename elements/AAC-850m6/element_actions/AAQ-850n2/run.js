function(instance, properties, context) {
    
    (async function(){
        try {
            instance.data.provider.close().then(response => instance.triggerEvent("disconnected"))
        } catch (error) {
            instance.publishState("error", error.message);
            instance.triggerEvent("error");
        }
    })()
    
}