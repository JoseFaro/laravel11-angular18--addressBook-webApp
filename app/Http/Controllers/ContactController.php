<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Contact;
use App\Models\Email;
use App\Models\Phone;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return 
            Contact::
                with('defaultAddress')
                ->with('defaultEmail')
                ->with('defaultPhone')
                ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $contact = new Contact();
        $contact->fill($input);
        $contact->save();
        
        // add addresses
        $addresses = $request->addresses;
        $should_add_addresses = is_array($addresses) && count($addresses);

        if ($should_add_addresses) {
            $addresses_to_add = [];

            foreach ($addresses as $address) {
                $addresses_to_add[] = [
                    'address' => $address['address'],
                    'is_default' => $address['is_default'] ? 1 : 0,
                ];
            }

            $contact->addresses()->createMany($addresses_to_add);
        }

        // add emails
        $emails = $request->emails;
        $should_add_emails = is_array($emails) && count($emails);

        if ($should_add_emails) {
            $emails_to_add = [];

            foreach ($emails as $email) {
                $emails_to_add[] = [
                    'email' => $email['email'],
                    'is_default' => $email['is_default'] ? 1 : 0,
                ];
            }

            $contact->emails()->createMany($emails_to_add);
        }

        // add phones
        $phones = $request->phones;
        $should_add_phones = is_array($phones) && count($phones);

        if ($should_add_phones) {
            $phones_to_add = [];

            foreach ($phones as $phone) {
                $phones_to_add[] = [
                    'phone' => $phone['phone'],
                    'is_default' => $phone['is_default'] ? 1 : 0,
                ];
            }

            $contact->phones()->createMany($phones_to_add);
        }

        return $contact;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return 
            Contact::
                with('addresses')
                ->with('emails')
                ->with('phones')
                ->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contact = Contact::find($id);
        $should_attempt_update = (bool) $contact;

        if ($should_attempt_update) {
            $input = $request->all();
            $contact->fill($input);
            $contact->save();
                        
            ///////////////////////////////////////////////////////////////////
            // addresses: delete the addresses to be removed from db (not sent in request)
            
            $addresses = $request->addresses;
            $addresses_to_upsert = [];
            $addresses_ids_to_delete = [];
            $addresses_ids_to_update = [];

            if (is_array($addresses)) {
                foreach($addresses as $request_address) {
                    if (isset($request_address->id)) {
                        $addresses_ids_to_update[] = $request_address->id;
                    }
                }
            }

            foreach($contact->addresses as $prev_address) {
                if (!in_array($prev_address->id, $addresses_ids_to_update)) {
                    $addresses_ids_to_delete[] = $prev_address->id;
                }
            }

            Address::destroy($addresses_ids_to_delete);

            ////////////////////////////////////////////////
            // addresses: upsert the remaining values (updated and new)

            if (is_array($addresses)) {
                foreach ($addresses as $address) {
                    $addresses_to_upsert[] = [
                        'id' => isset($address['id']) ? $address['id'] : null,
                        'address' => $address['address'],
                        'is_default' => $address['is_default'] ? 1 : 0,
                    ];
                }
            }

            $contact->addresses()->upsert($addresses_to_upsert, ['id'], ['address', 'is_default']);

            ///////////////////////////////////////////////////////////////////
            // emails: delete the emails to be removed from db (not sent in request)
    
            $emails = $request->emails;
            $emails_to_upsert = [];
            $emails_ids_to_delete = [];
            $emails_ids_to_update = [];

            if (is_array($emails)) {
                foreach($emails as $request_email) {
                    if (isset($request_email->id)) {
                        $emails_ids_to_update[] = $request_email->id;
                    }
                }
            }

            foreach($contact->emails as $prev_email) {
                if (!in_array($prev_email->id, $emails_ids_to_update)) {
                    $emails_ids_to_delete[] = $prev_email->id;
                }
            }

            Email::destroy($emails_ids_to_delete);

            ////////////////////////////////////////////////
            // emails: upsert the remaining values (updated and new)

            if (is_array($emails)) {
                foreach ($emails as $email) {
                    $emails_to_upsert[] = [
                        'id' => isset($email['id']) ? $email['id'] : null,
                        'email' => $email['email'],
                        'is_default' => $email['is_default'] ? 1 : 0,
                    ];
                }
            }

            $contact->emails()->upsert($emails_to_upsert, ['id'], ['email', 'is_default']);
    
            ///////////////////////////////////////////////////////////////////
            // phones: delete the phones to be removed from db (not sent in request)

            $phones = $request->phones;
            $phones_to_upsert = [];
            $phones_ids_to_delete = [];
            $phones_ids_to_update = [];

            if (is_array($phones)) {
                foreach($phones as $request_phone) {
                    if (isset($request_phone->id)) {
                        $phones_ids_to_update[] = $request_phone->id;
                    }
                }
            }

            foreach($contact->phones as $prev_phone) {
                if (!in_array($prev_phone->id, $phones_ids_to_update)) {
                    $phones_ids_to_delete[] = $prev_phone->id;
                }
            }

            Phone::destroy($phones_ids_to_delete);

            ////////////////////////////////////////////////
            // phones: upsert the remaining values (updated and new)

            if (is_array($phones)) {
                foreach ($phones as $phone) {
                    $phones_to_upsert[] = [
                        'id' => isset($phone['id']) ? $phone['id'] : null,
                        'phone' => $phone['phone'],
                        'is_default' => $phone['is_default'] ? 1 : 0,
                    ];
                }
            }

            $contact->phones()->upsert($phones_to_upsert, ['id'], ['phone', 'is_default']);
        }

        return $contact;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $id = $request->input('id');
        $should_attempt_destroy = is_numeric($id);

        if ($should_attempt_destroy) {
            Contact::destroy($id);
        }
    }
}
