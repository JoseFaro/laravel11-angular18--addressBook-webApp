<?php

namespace App\Services;

use App\Repositories\ContactRepository;

class ContactService
{
    protected $contactRepository;

    public function __construct(ContactRepository $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function getContact($id)
    {
        return $this->contactRepository->getContact($id);
    }

    public function getContacts()
    {
        return $this->contactRepository->getContacts();
    }

    public function storeContact($data)
    {
        return $this->contactRepository->storeContact($data);
    }

    public function updateContact($id, $data)
    {
        return $this->contactRepository->updateContact($id, $data);
    }

    public function deleteContact($id)
    {
        return $this->contactRepository->deleteContact($id);
    }
}