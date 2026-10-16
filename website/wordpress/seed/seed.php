<?php
/**
 * Seeds WordPress from website/content (mounted at /ns-content). Runs on every Playground boot, so
 * the JSON files are the source of truth for this reference build; edits made in wp-admin last
 * until the server restarts. Idempotent: entries are matched by type + slug.
 */

require_once '/wordpress/wp-load.php';

$root = '/ns-content';

function ns_read_json($file) {
    $data = json_decode(file_get_contents($file), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON in $file: " . json_last_error_msg());
    }
    return $data;
}

function ns_upsert($type, array $entry, $order = 0) {
    $existing = get_page_by_path($entry['slug'], OBJECT, $type);
    $parent   = 0;
    if (!empty($entry['parent'])) {
        $p = get_page_by_path($entry['parent'], OBJECT, $type);
        $parent = $p ? $p->ID : 0;
    }
    $id = wp_insert_post([
        'ID'           => $existing ? $existing->ID : 0,
        'post_type'    => $type,
        'post_status'  => 'publish',
        'post_name'    => $entry['slug'],
        'post_title'   => $entry['title'],
        'post_excerpt' => $entry['excerpt'] ?? '',
        'post_content' => $entry['content'] ?? '',
        'post_parent'  => $parent,
        'post_date'    => $entry['date'] ?? current_time('mysql'),
        'menu_order'   => $order,
    ], true);
    if (is_wp_error($id)) throw new Exception($id->get_error_message());

    if (isset($entry['sections'])) {
        update_post_meta($id, 'ns_sections', wp_slash(wp_json_encode($entry['sections'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)));
    }
    foreach ($entry['meta'] ?? [] as $key => $value) {
        $stored = is_string($value) ? $value : wp_json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        update_post_meta($id, 'ns_' . $key, wp_slash($stored));
    }
    if ($type === 'post' && !empty($entry['categories'])) {
        $ids = [];
        foreach ($entry['categories'] as $name) {
            $term  = term_exists($name, 'category') ?: wp_insert_term($name, 'category');
            $ids[] = (int) (is_array($term) ? $term['term_id'] : $term);
        }
        wp_set_post_categories($id, $ids);
    }
    return $id;
}

// Drop the default content a fresh install ships with.
foreach ([['hello-world', 'post'], ['sample-page', 'page'], ['privacy-policy', 'page']] as [$slug, $type]) {
    $default = get_page_by_path($slug, OBJECT, $type);
    if ($default) wp_delete_post($default->ID, true);
}

update_option('blogname', 'NicaSource');
update_option('blogdescription', 'Nearshore staff augmentation with elite engineering talent');
update_option('ns_site', wp_json_encode(ns_read_json("$root/site.json"), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));

$collections = ['pages' => 'page', 'posts' => 'post', 'jobs' => 'ns_job', 'case-studies' => 'ns_case_study'];
$count = 0;
foreach ($collections as $dir => $type) {
    $files = glob("$root/$dir/*.json") ?: [];
    sort($files); // numeric prefixes set the order (and parents before children)
    foreach ($files as $i => $file) {
        ns_upsert($type, ns_read_json($file), $i);
        $count++;
    }
}

$home = get_page_by_path('home');
if ($home) {
    update_option('show_on_front', 'page');
    update_option('page_on_front', $home->ID);
}

echo "Seeded $count entries\n";
