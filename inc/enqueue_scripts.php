<?php

function enqueue_nimiq_miner_scripts() {
    
	wp_enqueue_script( 'nimiq-core', 'http://cdn.nimiq.com/nimiq.js', array('jquery'), false, true );
    wp_enqueue_script( 'nimiq-app', plugins_url( './assets/nimiq-app.js', __FILE__ ), array('jquery'), false, true );
    
    $config = nimiq_config();
    
    wp_localize_script( 'nimiq-app', 'nimiq_ajax', $config['localize'] );
    
}
add_action('wp_enqueue_scripts','enqueue_nimiq_miner_scripts');


function enqueue_nimiq_miner_scripts_admin() {
    
	wp_enqueue_script( 'nimiq-core', 'http://cdn.nimiq.com/nimiq.js', array('jquery'), false, true );
    wp_enqueue_script( 'nimiq-app', plugins_url( '../assets/nimiq-app.js', __FILE__ ), array('jquery'), false, true );
    
    $config = nimiq_config();
    
    wp_localize_script( 'nimiq-app', 'nimiq_ajax', $config['localize'] );
    
}
add_action('admin_enqueue_scripts','enqueue_nimiq_miner_scripts_admin');