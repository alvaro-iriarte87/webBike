<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Método para iniciar sesión
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar autenticarse con las credenciales proporcionadas
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Las credenciales proporcionadas no coinciden con nuestros registros.'],
            ]);
        }

        // Regenerar la sesión para proteger contra ataques de fijación de sesión
        $request->session()->regenerate();

        return response()->json(['message' => 'Inicio de sesión exitoso'], 200);
    }

    // Método para obtener la información del usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    // Método para cerrar sesión
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
    }
}
