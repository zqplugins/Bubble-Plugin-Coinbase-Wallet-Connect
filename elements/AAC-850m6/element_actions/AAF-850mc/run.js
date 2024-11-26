function(instance, properties, context) {

    (async function(){
        try {
            const addresses = await instance.data.provider.request({
                method: 'eth_requestAccounts',
            });

            if(addresses[0]){
                instance.publishState("address_id", addresses[0]);
                
                let chainID = instance.data.provider.chain ? instance.data.provider.chain.id : instance.data.web3.utils.hexToNumber(instance.data.provider.chainId);

                instance.publishState("chain_id", chainID);
                instance.publishState("is_connected", instance.data.provider.connected);
                instance.triggerEvent("connected");
            }
        } catch (error) {
            instance.publishState("error", error.message);
            console.log(error);
        }
    })()

}