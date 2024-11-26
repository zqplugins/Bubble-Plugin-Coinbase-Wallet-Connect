function(instance, properties, context) {

    (async function(){
        try {
            let id_hex = instance.data.web3.utils.numberToHex(properties.chain_id);
            await instance.data.provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: id_hex }],
            }).then(response => console.log(response)).catch(error => console.log(error))
            //instance.publishState("chain_id", chainId);
            
        } catch (error) {
            instance.publishState("error", error.message);
            instance.triggerEvent("error");
        }
    })()

}