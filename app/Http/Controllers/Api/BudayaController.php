<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Budaya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BudayaController extends Controller
{
    // ==========================================
    // MENAMPILKAN SEMUA DATA BUDAYA
    // ==========================================

    public function index()
    {
        $budayas = Budaya::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil diambil',
            'data' => $budayas
        ]);
    }

    // ==========================================
    // MENYIMPAN DATA BUDAYA BARU
    // ==========================================

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_tempat' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',

            'koordinat' => [
                'required',
                'regex:/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/'
            ],

            'deskripsi' => 'nullable|string',

            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            // Video sekarang menggunakan URL
            'video' => 'nullable|url|max:255',
        ]);

        // Memisahkan latitude dan longitude
        $koordinat = explode(',', $validated['koordinat']);

        $latitude = trim($koordinat[0]);
        $longitude = trim($koordinat[1]);

        // Validasi batas koordinat
        if (
            $latitude < -90 || $latitude > 90 ||
            $longitude < -180 || $longitude > 180
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Koordinat tidak valid'
            ], 422);
        }

        // Upload foto
        $foto = null;

        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')
                ->store('budaya/foto', 'public');
        }

        // Simpan data ke database
        $budaya = Budaya::create([
            'nama_tempat' => $validated['nama_tempat'],
            'kategori' => $validated['kategori'],
            'latitude' => $latitude,
            'longitude' => $longitude,
            'deskripsi' => $validated['deskripsi'] ?? null,
            'foto' => $foto,
            'video' => $validated['video'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil disimpan',
            'data' => $budaya
        ], 201);
    }

    // ==========================================
    // MENAMPILKAN DETAIL SATU DATA
    // ==========================================

    public function show(string $id)
    {
        $budaya = Budaya::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $budaya
        ]);
    }

    // ==========================================
    // MENGEDIT DATA BUDAYA
    // ==========================================

    public function update(Request $request, string $id)
    {
        $budaya = Budaya::findOrFail($id);

        $validated = $request->validate([
            'nama_tempat' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|string|max:255',

            'koordinat' => [
                'sometimes',
                'required',
                'regex:/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/'
            ],

            'deskripsi' => 'nullable|string',

            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            // Video sekarang menggunakan URL
            'video' => 'sometimes|nullable|url|max:255',
        ]);

        $data = collect($validated)
            ->except('koordinat')
            ->toArray();

        // Memproses koordinat
        if (isset($validated['koordinat'])) {
            $koordinat = explode(',', $validated['koordinat']);

            $latitude = trim($koordinat[0]);
            $longitude = trim($koordinat[1]);

            if (
                $latitude < -90 || $latitude > 90 ||
                $longitude < -180 || $longitude > 180
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Koordinat tidak valid'
                ], 422);
            }

            $data['latitude'] = $latitude;
            $data['longitude'] = $longitude;
        }

        // Memperbarui foto
        if ($request->hasFile('foto')) {
            if ($budaya->foto) {
                Storage::disk('public')->delete($budaya->foto);
            }

            $data['foto'] = $request->file('foto')
                ->store('budaya/foto', 'public');
        }

        // Memperbarui URL video
        // Tidak ada upload atau penghapusan file video
        $budaya->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil diperbarui',
            'data' => $budaya->fresh()
        ]);
    }

    // ==========================================
    // MENGHAPUS DATA BUDAYA
    // ==========================================

    public function destroy(string $id)
    {
        $budaya = Budaya::findOrFail($id);

        // Hapus file foto
        if ($budaya->foto) {
            Storage::disk('public')->delete($budaya->foto);
        }

        // Video berupa URL, jadi tidak perlu menghapus file

        $budaya->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil dihapus'
        ]);
    }
}
