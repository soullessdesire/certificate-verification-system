<?php

// database/factories/ContactMessageFactory.php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ContactMessageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'enquiry_type' => $this->faker->randomElement([
                'Certificate verification issue',
                'QR code not scanning',
                'Lost or damaged certificate',
                'Employer verification request',
                'Transcript request',
                'General enquiry',
                'Other',
            ]),
            'message' => $this->faker->paragraphs(2, true),
            'read_at' => $this->faker->optional(0.4)->dateTimeThisMonth(),
            'read_by' => null,
        ];
    }

    public function unread(): static
    {
        return $this->state(['read_at' => null, 'read_by' => null]);
    }

    public function read(): static
    {
        return $this->state([
            'read_at' => now()->subHours(rand(1, 48)),
        ]);
    }
}
