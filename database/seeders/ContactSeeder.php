<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ContactSeeder extends Seeder
{
    private $faker = null;

    private $addressSeedLimit = 3;
    private $contactSeedLimit = 500;
    private $emailsSeedLimit = 2;
    private $phonesSeedLimit = 2;

    /**
     * Run the database seeds.
     */
    public function run()
    {
        $this->faker = Faker::create();
        $this->seedContacts();
    }

    private function seedContacts()
    {
        for ($i = 0; $i < $this->contactSeedLimit; $i++) {
            $now = Carbon::now()->format('Y-m-d H:i:s');
            $contact_id = DB::table('contacts')->insertGetId([
                'name' => $this->faker->name,
                'dateOfBirth' => $this->faker->dateTime->format('Y-m-d'),
                'website' => $this->faker->url,
                'company' => $this->faker->company,
                'notes' => $this->faker->sentence,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $this->seedContactAddresses($contact_id);
            $this->seedContactEmails($contact_id);
            $this->seedContactPhones($contact_id);
        }
    }

    private function seedContactAddresses($contact_id) {
        for ($i = 0; $i < $this->addressSeedLimit; $i++) {
            $baseTableValues = $this->prepareBaseContactInfoValues($contact_id, $i);
            $data = array_merge($baseTableValues, ['address' => $this->faker->address]);
            DB::table('contact_addresses')->insert($data);
        }
    }

    private function seedContactEmails($contact_id) {
        for ($i = 0; $i < $this->emailsSeedLimit; $i++) {
            $baseTableValues = $this->prepareBaseContactInfoValues($contact_id, $i);
            $data = array_merge($baseTableValues, ['email' => $this->faker->email]);
            DB::table('contact_emails')->insert($data);
        }
    }

    private function seedContactPhones($contact_id) {
        for ($i = 0; $i < $this->phonesSeedLimit; $i++) {
            $baseTableValues = $this->prepareBaseContactInfoValues($contact_id, $i);
            $data = array_merge($baseTableValues, ['phone' => $this->faker->phoneNumber]);
            DB::table('contact_phones')->insert($data);
        }
    }

    private function prepareBaseContactInfoValues($contact_id, $iteration_counter) {
        $now = Carbon::now()->format('Y-m-d H:i:s');

        return [
            'contact_id' => $contact_id,
            'is_default' => $this->shouldSetDefault($iteration_counter),
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }

    private function shouldSetDefault($iteration_counter) {
        $is_first_iteraion = $iteration_counter == 0;
        return $is_first_iteraion ? 1 : 0;
    }
}
