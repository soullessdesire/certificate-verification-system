<?php
// database/seeders/ContactMessageSeeder.php

namespace Database\Seeders;

use App\Models\ContactMessage;
use Illuminate\Database\Seeder;

class ContactMessageSeeder extends Seeder
{
    public function run(): void
    {
        // 10 unread messages
        ContactMessage::factory()->count(10)->unread()->create();

        // 15 already read messages
        ContactMessage::factory()->count(15)->read()->create();
    }
}
