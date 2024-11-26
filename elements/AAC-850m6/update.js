function(instance, properties, context) {

    if(!instance.data.properties){
        instance.data.properties = properties;
        instance.data.initCW();
    }

}