function(instance, context) {

    instance.data.sdk = {};
    instance.data.provider = {};

    instance.data.initCW = function(){
        
        if(!window.coinbasewalletSdk){
            console.log("CoinbaseWalletSDK not defined");
            instance.publishState("error", "CoinbaseWalletSDK not defined");
            return;
        }
        
        let CoinbaseWalletSDK = window.coinbasewalletSdk.CoinbaseWalletSDK;
        
        instance.data.sdk = new CoinbaseWalletSDK({
            appName: instance.data.properties.app_name,
            appChainIds: instance.data.properties.chains,
            appLogoUrl: instance.data.properties.applogourl,
        });


        instance.data.provider = instance.data.sdk.makeWeb3Provider({options: instance.data.properties.provider_options});

        instance.data.web3 = new Web3(instance.data.provider);

        if(instance.data.provider.connected && instance.data.provider.selectedAddress){
            instance.publishState("address_id", instance.data.provider.selectedAddress);
            instance.publishState("chain_id", instance.data.web3.utils.hexToNumber(instance.data.provider.chainId));
            instance.publishState("is_connected", instance.data.provider.connected);
        }

        instance.data.provider.on('disconnect', (error) => {
            instance.triggerEvent("disconnected");
        });

        instance.data.provider.on('chainChanged', (chainId) => {
            instance.publishState("chain_id", chainId);
            instance.triggerEvent("chain_changed");
        });
    }
}