<?php


use function Pest\Laravel\get;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;


test('example', function () {
    $response = get('/');

    $response->assertStatus(200);
});
