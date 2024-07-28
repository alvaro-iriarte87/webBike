<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validar la solicitud
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'profilePicture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        // Enviar respuesta de error si la validación falla
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Crear un nuevo usuario
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        // Manejar la foto de perfil
        if ($request->hasFile('profilePicture')) {
            $fileName = time() . '.' . $request->profilePicture->extension();
            $request->profilePicture->move(public_path('images'), $fileName);
            $user->profile_picture = $fileName;
        }

        // Guardar el usuario en la base de datos
        $user->save();

        return response()->json(['message' => 'Usuario registrado con éxito', 'user' => $user], 201);
    }
}
