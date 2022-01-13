<?php
/*
* Plugin Name: @FrontEditor MD by uptimizt
* Description: Svelte JS and own code
* Author: uptimizt
* Version: 0.1
*/

require_once __DIR__ . '/includes/Meta.php';

add_shortcode('fetest', function () {

    ob_start(); ?>

    <div class="feapp">loading...</div>

<?php return ob_get_clean();
});


add_action('wp_enqueue_scripts', function () {

    do_action('qm/debug', 1);

    if (!is_singular()) {
        return;
    }
    
    $post = get_post();

    if (!has_shortcode($post->post_content, 'fetest')) {
        return;
    }

    $file_path = '/frontend/public/build/bundle.css';
    $ver = filemtime(__DIR__ . $file_path);
    wp_enqueue_style('fedev', $src = plugins_url($file_path, __FILE__), $deps = [], $ver);

    $app_js_path = '/frontend/public/build/bundle.js';
    wp_enqueue_script('editorFeMd', plugins_url($app_js_path, __FILE__), [], filemtime(__DIR__ . $app_js_path), true);
    wp_localize_script( 'editorFeMd', 'editorFeMdApi', array(
        'root' => esc_url_raw( rest_url() ),
        'nonce' => wp_create_nonce( 'wp_rest' ),
        'pageUrl' => get_permalink($post),
    ));
});

