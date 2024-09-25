<?php

namespace App\Models;

use App\Models\Address;
use App\Models\Email;
use App\Models\Phone;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
  use HasFactory;

  protected $fillable = [
    'company',
    'dateOfBirth',
    'name',
    'notes',
    'website',
  ];

  public function addresses()
  {
    return $this->hasMany(Address::class);
  }

  public function emails()
  {
    return $this->hasMany(Email::class);
  }

  public function phones()
  {
    return $this->hasMany(Phone::class);
  }

}