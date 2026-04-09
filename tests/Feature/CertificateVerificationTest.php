<?php

use App\Models\Certificate;
use App\Models\User;

use function Pest\Laravel\get;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;


beforeAll(function () {
    Certificate::factory()->createOne(['status' => 'valid', 'hash' => 'howareyou']);
    Certificate::factory()->createOne(['status' => 'invalid', 'hash' => 'areyouthere']);
    Certificate::factory()->createOne(['status' => 'revoked', 'hash' => 'yesiamhere']);
});

test('verified user can visit verify page', function () {

    $user = User::factory()->create()->first();

    $response = actingAs($user)->get(route('verify'));

    $response->assertOk();
    $response->assertStatus(200);
});

test('unverified user can\'t visit verify page', function () {

    $response = get(route('verify'));

    $response->assertRedirect(route('login'));
});

test('user can search for certificate by hash', function () {
    $response = post(route('verify_result'), ['hash' => 'howareyou']);

    $response->assertOk();
});

test('user gets 404 when certificate hash not found', function () {
    $response = post(route('verify_result'), ['hash' => 'notexist']);

    $response->assertNotFound();
});


// Pest V4 Certificate Verification Browser Test

// test('user receives correct infromation from a valid certificate', function () {

//     $response = post(route('verify_result'), ['hash' => 'howareyou']);

//     $response->
// });

// test('user receives correct infromation from an invalid certificate', function () {

//     $response = post(route('verify_result'), ['hash' => 'areyouthere']);

//     $response->
// });

// test('user receives correct infromation from a revoked certificate', function () {

//     $response = post(route('verify_result'), ['hash' => 'yesiamhere']);

//     $response->
// });
