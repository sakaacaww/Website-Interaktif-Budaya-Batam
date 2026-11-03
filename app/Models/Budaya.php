<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Budaya extends Model
{
    protected $table = 'budayas';

    protected $fillable = [
        'nama_tempat',
        'category_id',
        'latitude',
        'longitude',
        'deskripsi',
        'foto',
        'video',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}