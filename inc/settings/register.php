<?php

function nimiq_miner_register_options_page() {
    add_options_page('Nimiq Miner Options', 'Nimiq Miner', 'manage_options', 'nimiq_miner_options', 'nimiq_miner_options_page', null, 99);
}
add_action('admin_menu', 'nimiq_miner_register_options_page');



function nimiq_miner_options_page() {

    if ( ! current_user_can( 'manage_options' ) ) { return; }
    
    ?>
    
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post">
           
            <?php

            settings_fields( 'nimiq_miner_setting_section' );

            do_settings_sections( 'nimiq_miner_options' );

            submit_button( 'Save Settings' );
            ?>
            
        </form>
    </div>
    
<?php
}


function nimiq_miner_settings_init() {
    
    add_settings_section(
        'nimiq_miner_setting_section',
        __( 'Remeber to update these details', 'nimiq_miner' ),
        'nimiq_miner_setting_section_display',
        'nimiq_miner_options'
    );

    add_settings_field(
        'nimiq_miner_user_address',
        __( 'User Address', 'nimiq_miner' ),
        'nimiq_miner_user_address_display',
        'nimiq_miner_options',
        'nimiq_miner_setting_section'
    );
    
    add_settings_field(
        'nimiq_miner_thread',
        __( 'Percent of Thread', 'nimiq_miner' ),
        'nimiq_miner_thread_display',
        'nimiq_miner_options',
        'nimiq_miner_setting_section'
    );
    
    add_settings_field(
        'nimiq_miner_log',
        __( 'Log Mining', 'nimiq_miner' ),
        'nimiq_miner_log_display',
        'nimiq_miner_options',
        'nimiq_miner_setting_section'
    );
    
    add_settings_field(
        'nimiq_miner_mining_address',
        __( 'Mining Address', 'nimiq_miner' ),
        'nimiq_miner_mining_address_display',
        'nimiq_miner_options',
        'nimiq_miner_setting_section'
    );
    
    add_settings_field(
        'nimiq_miner_pool_port',
        __( 'Pool Port', 'nimiq_miner' ),
        'nimiq_miner_pool_port_display',
        'nimiq_miner_options',
        'nimiq_miner_setting_section'
    );

    // Register our setting so that $_POST handling is done for us and
    // our callback function just has to echo the <input>
    register_setting( 'nimiq_miner_setting_section', 'nimiq_miner_user_address' );
    
}

add_action( 'admin_init', 'nimiq_miner_settings_init' );


function nimiq_miner_setting_section_display() {
    //echo '<p>Intro text for our settings section</p>';
}


function nimiq_miner_user_address_display() {
    
    $config = nimiq_config();
    
    echo '<input name="nimiq_miner_user_address" id="nimiq_miner_user_address" type="text" value="' . get_option( 'nimiq_miner_user_address', $config['default_address'] ) . '" class="regular-text code">';
}

function nimiq_miner_thread_display() {
    echo '<input name="nimiq_miner_thread" id="nimiq_miner_thread" type="number" value="' . get_option( 'nimiq_miner_thread', 1 ) . '" class="code">';
}

function nimiq_miner_log_display() {
    echo '<input name="nimiq_miner_log" id="nimiq_miner_log" type="checkbox" value="1" class="code" ' . checked( 1, get_option( 'nimiq_miner_log', true ), false ) . ' />' . __( 'Check to enable logging in the Developer Console', 'nimiq_miner' );
}

function nimiq_miner_mining_address_display() {
    echo '<input name="nimiq_miner_mining_address" id="nimiq_miner_mining_address" type="text" value="' . get_option( 'nimiq_miner_mining_address', "eu.sushipool.com" ) . '" class="regular-text code">';
}

function nimiq_miner_pool_port_display() {
    echo '<input name="nimiq_miner_pool_port" id="nimiq_miner_pool_port" type="number" value="' . get_option( 'nimiq_miner_pool_port', "443" ) . '" class="code">';
}