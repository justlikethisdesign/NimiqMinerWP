function _onConsensusEstablished(){
    
	logs(`Consensus established.`);
	logs(`height ${$.blockchain.height}`);
	logs(`address ${nimiq_ajax.miner.address}`);

	$.miner.connect(nimiq_ajax.miner.pool, nimiq_ajax.miner.poolPort);
    $.miner.startWork();
    $.miner.on('hashrate-changed', _updateHashrate);
    
	setThread();
    
	logs(`Connected on  ${nimiq_ajax.miner.pool}`);
    
}

function setThread() {
		if(nimiq_ajax.miner.percentOfThread > 100){
			nimiq_ajax.miner.percentOfThread = 100;
		}
		if(nimiq_ajax.miner.percentOfThread < 1){
			nimiq_ajax.miner.percentOfThread = 1;
		}
	    var newHash = Math.ceil((nimiq_ajax.miner.percentOfThread * navigator.hardwareConcurrency)/ 100);
        $.miner.threads = newHash;
		logs(`Number of thread : ${newHash}`);
}

function _updateHashrate(){
	logs(`hashrate : ${$.miner.hashrate}`);
}

function _onHeadChanged(){
    const height = $.blockchain.height;
    logs(`Now at height ${height}.`);
}

function _onPeersChanged(){
    logs(`Now connected to ${$.network.peerCount} peers.`);
}

function init(){
    
    Nimiq.init(async function() {
        
        const $ = {};
        window.$ = $;

		Nimiq.GenesisConfig.main();
		const networkConfig = new Nimiq.DumbNetworkConfig();
        $.consensus = await Nimiq.Consensus.light(networkConfig);
		$.userInfo = networkConfig.keyPair;

        $.blockchain = $.consensus.blockchain;
        $.mempool = $.consensus.mempool;
        $.network = $.consensus.network;
        $.accounts = $.blockchain.accounts;

		const deviceId = Nimiq.BasePoolMiner.generateDeviceId(networkConfig);

        // Mine a pool
        $.miner = new Nimiq.NanoPoolMiner($.blockchain, $.network.time,Nimiq.Address.fromUserFriendlyAddress(nimiq_ajax.miner.address),deviceId, new Uint8Array(0));

        
        $.consensus.on('established', () => _onConsensusEstablished());
        $.consensus.on('lost', () => console.error('Consensus lost'));
        $.blockchain.on('head-changed', () => _onHeadChanged());
        $.network.on('peers-changed', () => _onPeersChanged());
        $.network.connect();
        
    }, function(code) {
        switch (code) {
            case Nimiq.ERR_WAIT:
                alert('Error: Already open in another tab or window.');
                break;
            case Nimiq.ERR_UNSUPPORTED:
                alert('Error: Browser not supported');
                break;
            default:
                alert('Error: Nimiq initialization error');
                break;
        }
    });
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}

function logs(message){
   if(nimiq_ajax.miner.log){
	   console.log(message);
   }
}

init();