<?php

namespace App\Models;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
  use HasFactory;

  protected $table = 'contact_addresses';
  protected $fillable = [
    'address',
    'is_default',
  ];

  public function contact()
  {
    return $this->belongsTo(Contact::class);
  }
}