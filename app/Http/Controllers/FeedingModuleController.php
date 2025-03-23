<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FeedingModuleController extends Controller
{
    public function index()
    {
        return inertia('feedingOper/feddingOper');
    }
}
