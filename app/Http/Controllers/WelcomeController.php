<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
       // return 'Hello from the WelcomeController!';
       return view('welcome-again');
    }
}
