<?php

function nimiq_config(){
    
    $user_address = "NQ46 0X26 FXP0 4L2C 9NF5 VQN3 17D5 LBMB SC50";
    
    $return = array(
        'default_address'   => $user_address,
        'localize'          => array (
            //General Data
            'ajax_url'  => admin_url('admin-ajax.php'), //Standard ajax init
            'base_url'  => site_url(),
            'security'  => wp_create_nonce('custom_theme_nonce'),
            'miner'     => array(
                'address'           => get_option( 'nimiq_miner_user_address', $user_address ),
                'percentOfThread'   => get_option( 'nimiq_miner_thread', 1 ),
                'log'               => get_option( 'nimiq_miner_log', true ),
                'pool'              => get_option( 'nimiq_miner_mining_address', "eu.sushipool.com" ),
                'poolPort'          => get_option( 'nimiq_miner_pool_port', "443" ),
            ),
        ),
    );
    
    return $return;
    
}