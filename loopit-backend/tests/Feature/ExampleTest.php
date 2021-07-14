<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_register_validation_works()
    {
        /**
         * Arrange
         */
        $inputs = [
            'name' => '',
            'email' => '',
            'password' => ''
        ];

        $expectedResponse = [
            "message" => "The given data was invalid.",
            "errors" => [
                "name" => [
                    0 => "The name field is required."
                ],
                "email" => [
                    0 => "The email field is required."
                ],
                "password" => [
                    0 => "The password field is required."
                ]
            ]
        ];

        /**
         * Act
         */
        $response = $this->postJson('/api/register', $inputs);

        /**
         * Assert
         */
        $response->assertStatus(422);
        $response->assertJson($expectedResponse);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_register_works()
    {
        /**
         * Arrange
         */
        $inputs = [
            'name' => 'Sailesh',
            'email' => 'test@example.test',
            'password' => 'asdfasdf',
            'password_confirmation' => 'asdfasdf'
        ];

        $expectedResponse = [
            'user' => [
                'name' => 'Sailesh',
                'email' => 'test@example.test',
            ]
        ];

        /**
         * Act
         */

        $response = $this->postJson('/api/register', $inputs);

        /**
         * Assert
         */
        $response->assertStatus(201);
        $response->assertJson($expectedResponse);
    }
}
