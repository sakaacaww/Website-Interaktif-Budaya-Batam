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
        $budayas = Budaya::with('category')
            ->latest()
            ->get();

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

            'category_id' => 'required|exists:categories,id',

            'koordinat' => [
                'required',
                'regex:/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/'
            ],

            'deskripsi' => 'nullable|string',

            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video' => 'nullable|url|max:255',
        ]);

        // Memisahkan latitude dan longitude
        $koordinat = explode(',', $validated['koordinat']);

        $latitude = (float) trim($koordinat[0]);
        $longitude = (float) trim($koordinat[1]);

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

        // Menyimpan data budaya
        $budaya = Budaya::create([
            'nama_tempat' => $validated['nama_tempat'],
            'category_id' => $validated['category_id'],
            'latitude' => $latitude,
            'longitude' => $longitude,
            'deskripsi' => $validated['deskripsi'] ?? null,
            'foto' => $foto,
            'video' => $validated['video'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil disimpan',
            'data' => $budaya->load('category')
        ], 201);
    }

    // ==========================================
    // MENAMPILKAN DETAIL SATU DATA BUDAYA
    // ==========================================

    public function show(string $id)
    {
        $budaya = Budaya::with('category')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Detail data budaya berhasil diambil',
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

            'category_id' => 'sometimes|required|exists:categories,id',

            'koordinat' => [
                'sometimes',
                'required',
                'regex:/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/'
            ],

            'deskripsi' => 'sometimes|nullable|string',

            'foto' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',

            'video' => 'sometimes|nullable|url|max:255',
        ]);

        // Menyiapkan data yang akan diperbarui
        $data = collect($validated)
            ->except('koordinat')
            ->toArray();

        // Memproses koordinat
        if (isset($validated['koordinat'])) {
            $koordinat = explode(',', $validated['koordinat']);

            $latitude = (float) trim($koordinat[0]);
            $longitude = (float) trim($koordinat[1]);

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

            $data['latitude'] = $latitude;
            $data['longitude'] = $longitude;
        }

        // Memperbarui foto
        if ($request->hasFile('foto')) {

            // Menghapus foto lama
            if ($budaya->foto) {
                Storage::disk('public')->delete($budaya->foto);
            }

            // Menyimpan foto baru
            $data['foto'] = $request->file('foto')
                ->store('budaya/foto', 'public');
        }

        // Memperbarui data budaya
        $budaya->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil diperbarui',
            'data' => $budaya->fresh()->load('category')
        ]);
    }

    // ==========================================
    // MENGHAPUS DATA BUDAYA
    // ==========================================

    public function destroy(string $id)
    {
        $budaya = Budaya::findOrFail($id);

        // Menghapus foto dari storage
        if ($budaya->foto) {
            Storage::disk('public')->delete($budaya->foto);
        }

        // Menghapus data budaya
        $budaya->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data budaya berhasil dihapus'
        ]);
    }
}
