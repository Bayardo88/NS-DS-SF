<?php
/**
 * Plugin Name: NicaSource Headless
 * Description: Content model for the headless NicaSource 2025 website. Pages are built from a list
 *              of typed sections (stored as JSON in `ns_sections`), jobs and case studies are custom
 *              post types, and site-wide settings (nav, footer, contact module) live in one option.
 *              The React frontend in website/frontend reads everything through the REST API.
 */

defined('ABSPATH') || exit;

/* -------------------------------------------------------------------------- */
/* Content types                                                              */
/* -------------------------------------------------------------------------- */

add_action('init', function () {
    register_post_type('ns_job', [
        'label'        => 'Jobs',
        'labels'       => ['singular_name' => 'Job'],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'jobs',
        'menu_icon'    => 'dashicons-id',
        'supports'     => ['title', 'editor', 'excerpt', 'custom-fields'],
        'rewrite'      => ['slug' => 'careers/jobs'],
    ]);

    register_post_type('ns_case_study', [
        'label'        => 'Case Studies',
        'labels'       => ['singular_name' => 'Case Study'],
        'public'       => true,
        'show_in_rest' => true,
        'rest_base'    => 'case-studies',
        'menu_icon'    => 'dashicons-chart-line',
        'supports'     => ['title', 'editor', 'excerpt', 'custom-fields'],
        'rewrite'      => ['slug' => 'results'],
    ]);

    // Page builder: an ordered list of sections, each `{ "type": "<pattern>", ...props }`.
    foreach (['page', 'ns_case_study', 'ns_job'] as $type) {
        register_post_meta($type, 'ns_sections', [
            'type'         => 'string',
            'single'       => true,
            'show_in_rest' => true,
            'description'  => 'JSON array of typed page sections rendered by the frontend section registry.',
        ]);
    }

    // Structured fields per type. JSON strings keep the model flexible without ACF.
    $fields = [
        'post'          => ['ns_image', 'ns_tags', 'ns_reading_time', 'ns_author', 'ns_body', 'ns_featured', 'ns_home_slot'],
        'ns_job'        => ['ns_location', 'ns_type', 'ns_hours', 'ns_seniority', 'ns_tags', 'ns_body', 'ns_role_name', 'ns_work_mode', 'ns_english_level', 'ns_image', 'ns_hero_image', 'ns_about_company', 'ns_responsibilities', 'ns_requirements', 'ns_nice_to_have', 'ns_benefits_intro', 'ns_benefits', 'ns_apply_url', 'ns_status', 'ns_valid_through'],
        'ns_case_study' => ['ns_client', 'ns_industry', 'ns_image', 'ns_logo', 'ns_tags', 'ns_summary', 'ns_project', 'ns_hero_image', 'ns_headline', 'ns_featured', 'ns_testimonial'],
    ];
    foreach ($fields as $type => $keys) {
        foreach ($keys as $key) {
            register_post_meta($type, $key, ['type' => 'string', 'single' => true, 'show_in_rest' => true]);
        }
    }
});

/* -------------------------------------------------------------------------- */
/* REST: one call per page                                                    */
/* -------------------------------------------------------------------------- */

function ns_decode($value) {
    if (!is_string($value) || $value === '') return $value;
    $decoded = json_decode($value, true);
    return json_last_error() === JSON_ERROR_NONE ? $decoded : $value;
}

function ns_shape_post(WP_Post $post) {
    $meta = [];
    foreach (get_post_meta($post->ID) as $key => $values) {
        if (strpos($key, 'ns_') === 0) $meta[substr($key, 3)] = ns_decode($values[0]);
    }
    $sections = $meta['sections'] ?? [];
    unset($meta['sections']);
    return [
        'id'       => $post->ID,
        'type'     => $post->post_type,
        'slug'     => $post->post_name,
        'title'    => get_the_title($post),
        'excerpt'  => $post->post_excerpt,
        'date'     => get_post_time('c', true, $post),
        'content'  => apply_filters('the_content', $post->post_content),
        'meta'     => (object) $meta,
        'sections' => $sections,
    ];
}

add_action('rest_api_init', function () {
    // Site-wide settings: navigation, footer, contact module.
    register_rest_route('ns/v1', '/site', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => fn() => ns_decode(get_option('ns_site', '{}')),
    ]);

    // A page (or any routed entry) by path: /ns/v1/route?path=/services/development
    register_rest_route('ns/v1', '/route', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'args'                => ['path' => ['type' => 'string', 'required' => true]],
        'callback'            => function (WP_REST_Request $request) {
            $path = trim($request['path'], '/');
            if ($path === '') $path = 'home';

            $page = get_page_by_path($path, OBJECT, 'page');
            if (!$page && preg_match('#^results/([^/]+)$#', $path, $m)) {
                $page = get_page_by_path($m[1], OBJECT, 'ns_case_study');
            }
            if (!$page && preg_match('#^careers/jobs/([^/]+)$#', $path, $m)) {
                $page = get_page_by_path($m[1], OBJECT, 'ns_job');
            }
            if (!$page && preg_match('#^insights/([^/]+)$#', $path, $m)) {
                $page = get_page_by_path($m[1], OBJECT, 'post');
            }
            if (!$page || $page->post_status !== 'publish') {
                return new WP_Error('ns_not_found', 'No content at this path', ['status' => 404]);
            }
            return ns_shape_post($page);
        },
    ]);

    // Collections used by list sections (insights grid, job board, case-study list).
    register_rest_route('ns/v1', '/collection/(?P<type>posts|jobs|case-studies)', [
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'callback'            => function (WP_REST_Request $request) {
            $map   = ['posts' => 'post', 'jobs' => 'ns_job', 'case-studies' => 'ns_case_study'];
            $posts = get_posts([
                'post_type'   => $map[$request['type']],
                'numberposts' => (int) ($request['limit'] ?? -1) ?: -1,
                'orderby'     => 'menu_order date',
                'order'       => 'ASC',
            ]);
            return array_map('ns_shape_post', $posts);
        },
    ]);
});

/* -------------------------------------------------------------------------- */
/* Headless plumbing                                                          */
/* -------------------------------------------------------------------------- */

// Let the Vite dev server (any localhost port) read the API.
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        if ($origin && preg_match('#^https?://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Vary: Origin');
        }
        return $value;
    });
}, 15);

// The theme is never shown: send visitors of the WP front end to the React site.
add_action('template_redirect', function () {
    if (is_admin() || wp_doing_ajax() || (defined('REST_REQUEST') && REST_REQUEST)) return;
    $front = getenv('NS_FRONTEND_URL') ?: 'http://localhost:5173';
    wp_redirect($front . ($_SERVER['REQUEST_URI'] ?? '/'), 302);
    exit;
});

// A raw JSON editor for sections in wp-admin (the "page builder" for this reference build).
add_action('add_meta_boxes', function () {
    foreach (['page', 'ns_case_study', 'ns_job'] as $type) {
        add_meta_box('ns_sections_box', 'Page sections (JSON)', function ($post) {
            wp_nonce_field('ns_sections', 'ns_sections_nonce');
            $value = get_post_meta($post->ID, 'ns_sections', true);
            $pretty = $value ? wp_json_encode(json_decode($value), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : '[]';
            echo '<p>Ordered list of <code>{ "type": "&lt;pattern&gt;", ... }</code> objects. See website/DESIGN.md for every pattern and its fields.</p>';
            echo '<textarea name="ns_sections" style="width:100%;min-height:420px;font-family:monospace">' . esc_textarea($pretty) . '</textarea>';
        }, $type, 'normal', 'high');
    }
});

add_action('save_post', function ($post_id) {
    if (!isset($_POST['ns_sections_nonce']) || !wp_verify_nonce($_POST['ns_sections_nonce'], 'ns_sections')) return;
    if (!current_user_can('edit_post', $post_id)) return;
    $raw = wp_unslash($_POST['ns_sections'] ?? '');
    json_decode($raw);
    if (json_last_error() === JSON_ERROR_NONE) update_post_meta($post_id, 'ns_sections', $raw);
});
