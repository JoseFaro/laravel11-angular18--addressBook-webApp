<?php

namespace App\Repositories;

use App\Models\Address;
use App\Models\Contact;
use App\Models\Email;
use App\Models\Phone;

class ContactRepository
{
  public function getContact($id)
  {
    return 
      Contact::
        with('addresses')
        ->with('emails')
        ->with('phones')
        ->find($id);
  }

  public function getContacts()
  {
    return Contact::
      with('defaultAddress')
      ->with('defaultEmail')
      ->with('defaultPhone')
      ->with('addresses')
      ->with('emails')
      ->with('phones')
      ->get();
  }

  public function storeContact($data)
  {
    $contact = new Contact();
    $contact->fill($data);
    $contact->save();
    
    // add addresses
    $addresses = $data['addresses'];
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
    $emails = $data['emails'];
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
    $phones = $data['phones'];
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

  public function updateContact($id, $data)
  {
    $contact = Contact::find($id);
    $should_attempt_update = (bool) $contact;

    if ($should_attempt_update) {
      $contact->fill($data);
      $contact->save();
                  
      ///////////////////////////////////////////////////////////////////
      // addresses: delete the addresses to be removed from db (the ones not sent in request)
      
      $addresses = $data['addresses'];
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
      // emails: delete the emails to be removed from db (the ones not sent in request)

      $emails = $data['emails'];
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
      // phones: delete the phones to be removed from db (the ones not sent in request)

      $phones = $data['phones'];
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

  public function deleteContact($id)
  {
    $contact = Contact::find($id);

    if ($contact) {
      foreach($contact->addresses as $address) {
        Address::destroy($address->id);
      }

      foreach($contact->emails as $email) {
        Email::destroy($email->id);
      }

      foreach($contact->phones as $phone) {
        Phone::destroy($phone->id);
      }
      
      $contact->delete();
    }
  }
}