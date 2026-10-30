<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budaya extends Model
{
    protected $table = 'budayas';

    protected $fillable = [
        'nama_tempat',
        'kategori',
        'latitude',
        'longitude',
        'deskripsi',
        'foto',
        'video',
    ];
}
