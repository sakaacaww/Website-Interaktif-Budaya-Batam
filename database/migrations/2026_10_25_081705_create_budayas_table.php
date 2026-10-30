
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('budayas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tempat');
            $table->string('kategori');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->text('deskripsi')->nullable();
            $table->string('foto')->nullable();
            $table->string('video')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('budayas');
    }
};
