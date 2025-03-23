<?php

namespace App\Enum;

enum PermissionsEnum : string
{
    case LOGISTIC = 'logistic';
    case TECHNICAL = 'technical';
    case FEEDING = 'feeding';
    case MACHINE = 'machine';
    case USERMANAGER = 'user_manager';
}
