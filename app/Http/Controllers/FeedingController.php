<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FeedingController extends Controller
{
    public function index()
    {
        return inertia('feeding/feeding');
    }
}
